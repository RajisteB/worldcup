import React, { Component } from 'react';
import axios from 'axios';
import '../sass/_components/teams.css';

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
            <div className="group" key={idx}>
              <h2>GROUP {team.group}</h2>
              <div className="country-container">
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
            </div>
          )
        })}
      </div>
    )
  }
};

export default Teams;