import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

const todolist = combineReducers({
    todos,
    visibilityFilter
});

export default todolist;