/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

const Card = props => (
    <div className={`card ${!props.close ? ' opened' : ''} ${props.complete ? ' matched' : ''}`} onClick={props.click}>
        <div className="front">
            <img className="backCard" src="http://memorygame.ioconnectservices.com/Memo-Card.png" />
        </div>
        <div className="back">
            <img src={`http://memorygame.ioconnectservices.com/${props.framework}-Icon.png`}/>
        </div>
    </div>
);

export default Card;
