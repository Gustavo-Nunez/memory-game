import React from 'react';
import './styles.scss';

const UI = props => (
    <div className="row UI">
        <div className="col-6" style={{ marginTop: '-2%' }}>
            <div className="Pairs">
                <div className="PairsText">Pairs:</div>
                <div className="PairNumber">{props.pairs}</div>
            </div>
            <div className="EmptyBoxContainer">
                <div className="healthBarContainer" style={{ width: `${props.health}%` }}>
                    <img src="http://memorygame.ioconnectservices.com/Life-Bar-colors.png" />
                </div>
            </div>
        </div>
        {
            props.wonGame ? (
                <div className="col-6">
                    <div onClick={props.reshuffle} className="newGameButton">
                        <img src="http://memorygame.ioconnectservices.com/New-Game-Button.png" />
                    </div>
                </div>
            ) : null
        }
    </div>
)

export default UI;