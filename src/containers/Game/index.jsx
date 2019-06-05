import React, { Component } from 'react';
import Card from '../../components/Card';
import './styles.scss';

class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            frameworks: ['angular2','react','grunt','phantomjs','ember','gulp','meteor','nodejs'],
            duplicatedFrameworks: [],
            randomizedFrameworks: [],
            finalizedFrameworks: [],
            openedFrameworks: [],
            finished: 0,
        }
    }

    componentDidMount() {
        this.start();
    }

    shuffle = (array) => {
        const shuffledCards = array;
        let currentIndex = array.length;
        let temporaryValue;
        let randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = shuffledCards[currentIndex];
            shuffledCards[currentIndex] = shuffledCards[randomIndex];
            shuffledCards[randomIndex] = temporaryValue;
        }
        return shuffledCards;
    }

    handleClick(name, index) {
        const { openedFrameworks, finalizedFrameworks } = this.state;
        if (openedFrameworks.length === 2) {
            // setTimeout(() => {
            //     this.check();
            // }, 750);
        } else {
            const framework = {
                name, index,
            };
            const pairedFrameworks = finalizedFrameworks;
            const frameworks = openedFrameworks;
            pairedFrameworks[index].close = false;
            frameworks.push(framework);
            this.setState({
                openedFrameworks: frameworks,
                finalizedFrameworks: pairedFrameworks,
            });
            if (openedFrameworks.length === 2) {
                setTimeout(() => {
                    this.check();
                }, 750);
            }
        }
    }

    check() {
        const { finalizedFrameworks, openedFrameworks, finished } = this.state;
        const { resetGame, addAttempt, addCompletedPair } = this.props;
        const pairedFrameworks = finalizedFrameworks;
        let count = 0;
        if ((openedFrameworks[0].name === openedFrameworks[1].name) && (openedFrameworks[0].index !== openedFrameworks[1].index)) {
            pairedFrameworks[openedFrameworks[0].index].complete = true;
            pairedFrameworks[openedFrameworks[1].index].complete = true;
            addCompletedPair();
            count = 1;
        } else {
            pairedFrameworks[openedFrameworks[0].index].close = true;
            pairedFrameworks[openedFrameworks[1].index].close = true;
            if (openedFrameworks[0].index !== openedFrameworks[1].index) {
                addAttempt();
            }
        }

        if (finished === 7) {
            resetGame();
        }

        this.setState({
            finalizedFrameworks: pairedFrameworks,
            openedFrameworks: [],
            finished: finished + count,
        });
    }

    start() {
        const { frameworks } = this.state;
        const pairedFrameworks = [];
        const duplicatedFrameworks = frameworks.concat(frameworks);
        const randomizedFrameworks = this.shuffle(duplicatedFrameworks);
        randomizedFrameworks.map((name, index) => {
            pairedFrameworks.push({
                name,
                close: true,
                complete: false,
                fail: false,
            });
        });

        this.setState({
            duplicatedFrameworks,
            randomizedFrameworks,
            finalizedFrameworks: pairedFrameworks,
        })
    }

    render() {
        const { finalizedFrameworks } = this.state;
        return (
            <div className="playground">
                {
                    finalizedFrameworks.map((framework, index) => {
                        return <Card framework={framework.name} click={() => this.handleClick(framework.name, index)} close={framework.close} complete={framework.complete} />;
                    })
                }
            </div>
        );
    }
}

export default Game;
