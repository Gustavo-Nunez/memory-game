import React, { Component } from 'react';
import Game from '../Game';
import WonGame from '../WonMenu';
import Menu from '../Menu';
import UI from '../UI';
import leftCorner from '../../images/left-corner-1400.png';
import rightCorner from '../../images/right-corner-1400.png';
import companyLogo from '../../images/logo-iocs-1400.png';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import './App.scss';

class App extends Component {
  state = {
      wonGame: false,
      attempts: 1,
      pairsCompleted: 0,
  }

  resetGame = () => this.setState({ wonGame: true });

  reshuffle = () => this.setState({ wonGame: false, attempts: 1, pairsCompleted: 0 });

  addAttempt = () => {
      const { attempts } = this.state; 
      if (attempts < 4) {
          this.setState({ attempts: attempts + 1 });
      } else {
          this.resetGame();
      }
  }

  addCompletedPair = () => {
      const { pairsCompleted } = this.state;
      this.setState({ pairsCompleted: pairsCompleted + 1 });
  }

  render() {
      const { wonGame, attempts, pairsCompleted } = this.state;
      return (
          <div className="App">
              <div className="MenuColor">
                  <div className="MenuCorner">
                      <img src={rightCorner} className="RightCorner" />
                      <img src={leftCorner} className="LeftCorner"  />
                      <div className="MenuIcons" />
                  </div>
              </div>
              <img src={companyLogo} className="logo" />
              <div className="Game">
                  <Game resetGame={this.resetGame} addAttempt={this.addAttempt} addCompletedPair={this.addCompletedPair} />
                  <UI attempts={attempts} pairs={pairsCompleted} wonGame={wonGame} reshuffle={this.reshuffle} />
              </div>
          </div>
      );
  }
}
export default App;
