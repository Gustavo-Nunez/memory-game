/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

const Card = props => (
    <div className={`card ${!props.close ? ' opened' : ''} ${props.complete ? ' matched' : ''}`} onClick={props.click}>
        <div className="front">
        ?
        </div>
        <div className="back">
            <img src={"https://raw.githubusercontent.com/samiheikki/javascript-guessing-game/master/static/logos/" + props.framework + ".png"}/>
        </div>
    </div>
);

export default Card;
