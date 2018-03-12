import logger from 'js-logger';
//
const logActionsMiddleware = store => next => action => {
    let payload = Object.keys(action)
            .filter(key => key !== 'type')
            .reduce((payload, key) => {
                payload[key] = action[key];
                return payload;
        }, {});

    logger.log(`redux.${action.type}|${JSON.stringify(payload)}`);
    return next(action);
};

export default logActionsMiddleware;