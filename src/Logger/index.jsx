import React, { Component } from 'react';
import PropTypes from 'prop-types';
import mobileDetector from './utils/mobileDetector';
import platform from 'platform';
import CollectionWithLimit from './utils/CollectionWithLimit';
import { isString, isObject, isArray } from './utils/valid.types';
import isBackend from './utils/isBackend';
import { getCurrentDateISO } from './utils/date';
import logger from 'js-logger';
import mode, { isLogging } from './utils/mode';
import { sendLog } from './service';
import { getType, CRITICAL } from './types';
import consoleOutput from './console.output';
import { getItem } from './utils/localStorage';
import { mixParams, serializeError } from './utils/errorHelpers';
import UIDGenerator from './utils/uid';
import BSOD from './BSOD';
const { name, os, version } = platform;
const sessionUID = new UIDGenerator();
/**
 * Types:
 * log
 * info
 * warn
 * error
 * debug
 * */
logger.useDefaults();

const LIMIT = isLogging ? 75 : 25;

class LoggerContainer extends Component {
    static childContextTypes = {
        logger: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.stackCollection = new CollectionWithLimit({ limit: LIMIT });
        
        this.BROWSER = `${name} ${version}`;
        this.OS = `${os.family} ${os.architecture}-bit`;

        this.__hasCriticalError = false;

        global.__session_id__ = sessionUID.getUID();
        let screen = global.screen
            ? Object.assign(
                  {},
                  {
                      width: global.screen.width,
                      height: global.screen.height,
                      colorDepth: global.screen.colorDepth,
                      pixelDepth: global.screen.pixelDepth
                  },
                  mobileDetector.isMobile() && global.screen.orientation ? { orientation: global.screen.orientation.type } : {}
              )
            : {};

        let device = mobileDetector.isMobile()
            ? {
                  type: platform.product,
                  description: platform.description,
                  ua: platform.ua
              }
            : {
                  type: 'pc',
                  description: platform.description,
                  ua: platform.ua
              };

        this.stack = {
            sessionId: global.__session_id__,
            session: {
                start: getCurrentDateISO()
            },
            env: {
                browser: this.BROWSER,
                os: this.OS
            },
            actions: this.stackCollection.data,
            screen,
            device
        };
    }

    getChildContext() {
        return {
            logger: {
                sendLogToServer: this.sendLogToServer
            }
        }
    }

    getStack = () => {
        return this.stack;
    };

    getStackData = () => {
        let nav = global.navigator || {};
        let lang = nav && nav.languages && isArray(nav.languages) ? nav.languages[0] : '';
        let href = window.location && window.location.href ? window.location.href : '';

        let actions = this.stackCollection.getData();
        this.stack.session.end = getCurrentDateISO();
        this.stack.actions = actions;
        this.stack.env.lang = lang;
        this.stack.env.href = href;
        this.stack.env.localization = getItem('localization');
        this.stack.env.theme = getItem('theme');
        this.stack.env.userID = getItem('userID');

        return JSON.parse(JSON.stringify(this.stack));
    };

    sendLogToServer = () => {
        return sendLog(this.getStackData());
    };

    componentWillMount() {
        logger.setHandler((messages, context) => {
            if (!isBackend()) {
                let msg = messages[0];
                let level = context.level.name.toLowerCase();
                let notificationShow = messages[1];

                let trackLevel = getType(level, false);

                if (notificationShow && this.props.stdout) {
                    this.props.stdout(getType(level, true), msg);
                }
                if (mode !== 'test') {
                    consoleOutput(trackLevel, msg);
                }

                let stackData;

                if (isString(msg)) {
                    let temp = {};
                    temp[trackLevel] = msg;
                    stackData = temp;
                } else if (isObject(msg)) {
                    stackData = msg;
                }

                if (stackData) {
                    this.stackCollection.add(mixParams.call(this, stackData, true));
                }
            }
        });
        if (!isBackend() && this.props.active) {
            window.onerror = (errorMsg, url, lineNumber, lineCount, trace) => {
                if (!this.__hasCriticalError) {
                    console.error('Critical error!');
                    this.__hasCriticalError = true;
                    let critical = {};
                    critical[CRITICAL] = serializeError(trace, lineNumber);
                    let criticalData = mixParams.call(this, critical, true);
                    this.stackCollection.add(criticalData);
                    let stackData = this.getStackData();
                    this.sendLogToServer(stackData);
                    if (isLogging) {
                        if (this.props.browserHistory) {
                            let { pathname } = this.props.browserHistory.getCurrentLocation();
                            pathname = pathname.indexOf('sessionid-') >= 0 ? pathname.slice(0, pathname.indexOf('sessionid-')) : pathname;

                            let hasSlash = pathname.lastIndexOf('/') === pathname.length - 1;
                            let postfix = `${hasSlash ? '' : '/'}sessionid-${stackData.sessionId}`;

                            this.props.browserHistory.push(`${pathname}${postfix}`);
                        }

                        let bsod = BSOD(stackData);
                        document.body.appendChild(bsod);
                    }
                }
            };
        }
    }
    render() {
        return this.props.children;
    }
}

export { LoggerContainer };

export default logger;
