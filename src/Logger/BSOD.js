import { CRITICAL } from './types';

export default function(stackData) {
    let error = document.createElement('div');
    const actions = stackData.actions;
    let actionsStart = '<ul style="list-style: list-item; font-size: 13px">';
    let actionsEnd = '</ul>';
    let cError = actions[actions.length - 1][CRITICAL];

    let actionsRenderStack = actions
        .filter(action => {
            let type = Object.keys(action)[0];
            return type !== CRITICAL;
        })
        .map(action => {
            let type = Object.keys(action)[0];
            let actionMessage = action[type];

            let itemStart = '<li>';
            let itemEnd = '</li>';

            itemStart += `<p><strong>${type}: ${actionMessage}</strong></p>`;
            itemStart += itemEnd;

            return itemStart;
        });

    let actionsFinish = actionsRenderStack.length > 0 ? actionsStart + actionsRenderStack.reverse().join('') + actionsEnd : 'Nothing actions';

    error.setAttribute(
        'style',
        `width: 100%;
        height: 100%;
        position: fixed;
        z-index: 10000;
        background: #0000aa;
        color: #b3b3b3;
        font-size: 24px;
        font-family: courier;
        top: 0;
        left: 0;`
    );

    let titleStyles = `display: inline-block;
                       padding: 0.25em 0.5em;
                       margin: 0 auto;
                       font-size: 1rem;
                       font-weight: bold;
                       background: #b3b3b3;
                       color: #0000aa;`;

    let paragraphStyle = 'font-size: 1rem; text-align: left; margin: 2em';

    error.innerHTML = `<h2 style="${titleStyles}">${cError.message}</h2>
                    <div style="${paragraphStyle}">
                        <pre>${cError.stack.join('\n')}</pre>
                        <h4>Actions:</h4>
                        ${actionsFinish}
                    </div>`;
    return error;
}
