import React, { Component } from 'react';
import Game from '../Game';
import UI from '../UI';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import './App.scss';

const baseUrl = 'http://memorygame.ioconnectservices.com/';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wonGame: false,
            health: 100,
            pairsCompleted: 0,
            frameworks: ['Auditing','BCDR','CloudAppDev','CloudMigration','CloudStrategy','DevOps','IOTBigData','Security'],
            duplicatedFrameworks: [],
            randomizedFrameworks: [],
            finalizedFrameworks: [],
            openedFrameworks: [],
            finished: 0,
            leftCorner: `${baseUrl}left-corner-1400.png`,
            rightCorner: `${baseUrl}right-corner-1400.png`,
            companyLogo: `${baseUrl}Logo-IOCS-Memo.png`,
            iconBackground: `${baseUrl}Icons-Background-Memo.png`,
            gameOver: `${baseUrl}Game-Over.png`,

        };
    }

    componentDidMount() {
        this.start();
    }

  resetGame = () => this.setState({ wonGame: true });

  reshuffle = () => {
      this.start();
      this.setState({ wonGame: false, health: 100, pairsCompleted: 0 });
  };

  addAttempt = () => {
      const { health } = this.state; 
      const newHealth = health - 20;
      if (newHealth > 0) {
          this.setState({ health: newHealth });
      } else {
          this.setState({ health: 0 });
          this.resetGame();
      }
  }

  addCompletedPair = () => {
      const { pairsCompleted } = this.state;
      this.setState({ pairsCompleted: pairsCompleted + 1 });
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

  handleClick = (name, index) => {
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

  check = () => {
      const { finalizedFrameworks, openedFrameworks, finished } = this.state;
      const pairedFrameworks = finalizedFrameworks;
      let count = 0;
      if ((openedFrameworks[0].name === openedFrameworks[1].name) && (openedFrameworks[0].index !== openedFrameworks[1].index)) {
          pairedFrameworks[openedFrameworks[0].index].complete = true;
          pairedFrameworks[openedFrameworks[1].index].complete = true;
          this.addCompletedPair();
          count = 1;
      } else {
          pairedFrameworks[openedFrameworks[0].index].close = true;
          pairedFrameworks[openedFrameworks[1].index].close = true;
          if (openedFrameworks[0].index !== openedFrameworks[1].index) {
              this.addAttempt();
          }
      }

      if (finished === 7) {
          this.resetGame();
      }

      this.setState({
          finalizedFrameworks: pairedFrameworks,
          openedFrameworks: [],
          finished: finished + count,
      });
  }

  start = () => {
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
      const { wonGame, health, pairsCompleted, finalizedFrameworks, leftCorner, rightCorner, companyLogo, iconBackground, gameOver } = this.state;
      return (
          <div className="App">
              <div className="MenuColor">
                  <img src={iconBackground} className="iconBackground" />
                  <div className="MenuCorner">
                      <img src={rightCorner} className="RightCorner" />
                      <img src={leftCorner} className="LeftCorner"  />
                  </div>
              </div>
              <img src={companyLogo} className="logo" />
              <div className="Game">
                  <Game wonGame={wonGame} finalizedFrameworks={finalizedFrameworks} handleClick={this.handleClick} />
                  <UI health={health} pairs={pairsCompleted} wonGame={wonGame} reshuffle={this.reshuffle} />
              </div>
              {
                  wonGame ? (
                      <div className="GameOver">
                          <img src={gameOver} />
                      </div>
                  ) : null
              }
          </div>
      );
  }
}
export default App;
