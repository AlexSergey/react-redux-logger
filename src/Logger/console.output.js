import { isFunction, isObject } from './utils/valid.types';

const consoleOutput = (trackLevel, msg = '') => {
    msg = isFunction(msg) ? msg() : msg;
    const success = ['background: green', 'color: white', 'font-weight: bold', 'display: block', 'text-align: center'].join(';');
    const warn = ['background: #e36149', 'color: white', 'font-weight: bold', 'display: block', 'text-align: center'].join(';');
    const error = ['background: #E30C17', 'color: white', 'font-weight: bold', 'display: block', 'text-align: center'].join(';');

    let parts = msg.split('|');
    let module, message;
    if (parts.length > 1) {
        module = parts[0];
        message = parts[1];
    } else {
        message = parts[0];
    }
    if (isObject(message)) {
        message = JSON.stringify(message);
    }

    if (isFunction(message)) {
        message = message();
    }
    switch (trackLevel) {
        case 'info':
            if (module) {
                console.log(`%c ${module} : `, success, message);
            } else {
                console.log(message);
            }

            break;
        case 'warn':
            if (module) {
                console.warn(`%c ${module} : `, warn, message);
            } else {
                console.warn(message);
            }

            break;
        case 'error':
            if (module) {
                console.error(`%c ${module} : `, error, message);
            } else {
                console.error(message);
            }
            break;
    }
};

export default consoleOutput;
