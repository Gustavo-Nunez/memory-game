import React, { Component } from 'react';
import Game from '../Game';
import WonGame from '../WonMenu';
import Menu from '../Menu';
import UI from "../UI";
import './App.scss';

class App extends Component {
  state = {
      startGame: false,
      wonGame: false,
      attempts: 1,
      pairsCompleted: 0,
  }

  resetGame = () => this.setState({ wonGame: true, startGame: false });

  initiateGame = () => this.setState({ startGame: true });

  reshuffle = () => this.setState({ wonGame: false, startGame: true, attempts: 1, pairsCompleted: 0 });

  quit = () => this.setState({ wonGame: false, startGame: false, attempts: 1, pairsCompleted: 0 });

  addAttempt = () => {
      const { attempts } = this.state; 
      if (attempts < 4) {
          this.setState({ attempts: attempts + 1 });
      } else {
         // this.resetGame();
      }
  }

  addCompletedPair = () => {
      const { pairsCompleted } = this.state; 
      this.setState({ pairsCompleted: pairsCompleted + 1 });
}

  render() {
      const { startGame, wonGame, attempts, pairsCompleted } = this.state;
      return (
          <div className="App">
              {
                  !startGame && !wonGame ? (
                      <Menu start={this.initiateGame} />
                  ) : ''
              }
              {
                  startGame && !wonGame ? (
                      <div>
                          <UI attempts={attempts} pairs={pairsCompleted} />
                          <Game resetGame={this.resetGame} addAttempt={this.addAttempt} addCompletedPair={this.addCompletedPair} />
                      </div>
                  ) : ''
              }
              {
                  wonGame ? (
                      <WonGame reshuffle={this.reshuffle} quit={this.quit} attempts={attempts} pairs={pairsCompleted} />
                  ) : ''
              }
          </div>
      );
  }
}
export default App;
