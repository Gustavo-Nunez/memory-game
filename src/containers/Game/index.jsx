import React from 'react';
import Card from '../../components/Card';
import './styles.scss';

const Game = (props) => {
    const { finalizedFrameworks, handleClick, wonGame } = props;

    return (
        <div className="playground" style={wonGame ? { filter: 'blur(10px)' } : null }>
            {
                finalizedFrameworks.map((framework, index) => {
                    return <Card framework={framework.name} click={() => handleClick(framework.name, index)} close={framework.close} complete={framework.complete} />;
                })
            }
        </div>
    )
}

export default Game;
