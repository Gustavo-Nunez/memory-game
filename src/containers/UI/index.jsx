import React from 'react';
import newGame from '../../images/new-game-button.png';
import './styles.scss';

const UI = props => (
    <div className="UI">
        <div>Pairs: {props.pairs}</div>
        <div>Attempt: {props.attempts}</div>
        {
            props.wonGame ? (
                <div onClick={props.reshuffle} className="newGameButton">
                    <img src={newGame} />
                </div>
            ) : null
        }
    </div>
)

export default UI;