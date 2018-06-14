import React, { Component } from 'react';
import axios from 'axios';

class Teams extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { teams } = this.props;
    return (
      <div className="teams-container">
        {teams.map((team, idx) => {
          return (
            <div key={idx}>
              <h2>GROUP {team.group}</h2>
              {team.teams.map((t) => {
                return (
                  <div key={t.id} className="teams">
                    <img src={t.flag} alt=""/>
                    <h3>{t.country}</h3>
                    <h5>{t.fifa_code}</h5>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }
};

export default Teams;