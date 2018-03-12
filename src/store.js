import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { isDefined } from './utils/valid.types';
import isClient from './utils/isClient';
import mode from './utils/mode';

// Middlewares
import loggerMiddleware from './Logger/log.middleware';
// Reducers:
import todolist from './Todolist/reducers';

let finalCreateStore = compose(
    applyMiddleware(
        loggerMiddleware
    ),
    (mode === 'development' && isClient() && isDefined(window.devToolsExtension)) ? window.devToolsExtension() : f => f
)(createStore);

let store = finalCreateStore(combineReducers({
    todolist
}));

export default store;