import React from 'react';

const WonMenu = props => (
    <div>
        <div>Attempt: {props.attempts}</div>
        <div>Pairs Completed: {props.pairs}</div>
        <button type="button" onClick={props.reshuffle}>Reshuffle</button>
        <button type="button" onClick={props.quit}>Quit</button>
    </div>
)

export default WonMenu;