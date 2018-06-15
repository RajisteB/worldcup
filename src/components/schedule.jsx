import React, { Component } from 'react';
import axios from 'axios';
import '../sass/_components/schedule.css';

class Schedule extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { matches } = this.props;

    return (
      <div className="schedule-container">
        {matches.map((match, idx) => {
          return (
            <div className="schedule" key={idx}>
              <h2>{match.date}</h2>
              {match.matches.map((game, idx) => {
                return (
                  <div className="game" key={idx}>
                    <h3>{game.away_team.country} vs {game.home_team.country}</h3>
                    <h4>{game.location}</h4>
                    <h5>{game.venue}, Rus</h5>
                    <h6>{game.gametime}</h6>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }
}

export default Schedule;