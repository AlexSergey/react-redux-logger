import React, { Component } from 'react'
import { LoggerContainer } from '../Logger';
import TodoList from '../Todolist';

class App extends Component {
    render() {
        return <div>
            <LoggerContainer>
                <TodoList />
            </LoggerContainer>
        </div>
    }
}

export default App;