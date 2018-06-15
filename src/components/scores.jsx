import React, { Component } from 'react';
import axios from 'axios';
import '../sass/_components/scores.css';

class Scores extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { scores } = this.props;
    console.log(scores);
    return (
      <div className="scores-container">
        {scores.map((score, idx) => {
          return (
            <div className="score-container" key={idx}>
              <div className="scores">
                <div className="goals">
                  <h1>{score.away_team.goals}</h1>
                  <h3>{score.away_team.country}</h3>
                </div>
                <div className="goals">
                  <h1>{score.home_team.goals}</h1>
                  <h3>{score.home_team.country}</h3>
                </div>
              </div>
              <div className="venue">
                <h5>{score.location}</h5>
                <h6>{score.venue}, Rus</h6>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Scores;