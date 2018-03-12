import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import Core from './Core';
import store from './store';

render(
    <Provider store={store}>
        <Core />
    </Provider>,
    document.getElementById('root')
);