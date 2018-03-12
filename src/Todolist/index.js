import React from 'react';
import PropTypes from 'prop-types';
import AddTodo from './containers/AddTodo';
import VisibleTodoList from './containers/VisibleTodoList';
import FilterLink from './components/FilterLinks';

const TodoList = (props, context) => {
    return <div>
        <AddTodo />
        <VisibleTodoList />
        <FilterLink />
        <button onClick={context.logger.sendLogToServer}>Send actions to server</button>
    </div>
};
TodoList.contextTypes = {
    logger: PropTypes.object.isRequired
};
export default TodoList;