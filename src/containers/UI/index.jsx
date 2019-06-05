import React from 'react';
import './styles.scss';

const UI = props => (
    <div className="UI">
        <div>Attempt: {props.attempts}</div>
        <div>Pairs Completed: {props.pairs}</div>
    </div>
)

export default UI;