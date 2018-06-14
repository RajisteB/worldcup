import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import moment from 'moment';
import countryCodes from 'country-code-info';
import Schedule from './components/schedule';
import Teams from './components/teams';

class App extends Component {
  constructor() {
    super();
    this.state = {
      teams: [],
      matches: {},
      dataLoaded: false,
    }
  }

  getTeams = () => {
    axios.get('http://worldcup.sfg.io/teams')
    .then(res => {
      console.log(res);
      let groups = [
        {group: 'A', teams: []}, {group: 'B', teams: []}, 
        {group: 'C', teams: []}, {group: 'D', teams: []}, 
        {group: 'E', teams: []}, {group: 'F', teams: []}, 
        {group: 'G', teams: []}, {group: 'H', teams: []}
      ];
      res.data.map(country => {

        // cleaning up data
        country.country === 'Columbia' ? country.country = 'Colombia' :
        country.country === 'England' ? country.country = 'United Kingdom' :
        country.country === 'Korea Republic' ? country.country = 'Korea, South' :
        null;

        // finding and setting country code to get flag image
        let code = countryCodes.findCountry({'name': `${country.country}`});
        country.country_code = code.a2;
        country.flag = `http://www.countryflags.io/${country.country_code}/flat/32.png`;

        return groups.map(section => {
          return country.group_letter === section.group ? section.teams.push(country) : null;
        })
      });
      this.setState({
        teams: groups
      })
    }).catch(err => {
      console.log(err);
    })
  }

  getMatches = () => {
    axios.get('http://worldcup.sfg.io/matches')
      .then(res => {
      // create new multidimensional object variables
      let matchObj = {};
      matchObj.games = [];
      console.log(res);
      res.data.map((d, idx) => {

        // parse with moment.js to display game dates & times
        let gametime = moment(d.datetime)._d.toString();
        d.datetime = gametime.split(' ').splice(0,3).join(' ') + " 2018";
        d.gametime = gametime.split(' ').splice(4,6).join(' ');

        // create game schedule obj for each gameday
        idx >= 1 ? 
        d.datetime === res.data[idx - 1].datetime ? 
        null : matchObj.games.push({date: d.datetime, matches: []}) : 
        matchObj.games.push({ date: d.datetime, matches: []});

        // include all matches for each gameday
        return matchObj.games.map(g => {
          return d.datetime === g.date ? g.matches.push(d) : null;
        })
      });

      console.log(matchObj.games);

      this.setState({
        matches: matchObj.games,
        dataLoaded: true
      })
    }).catch(err => {
      console.log(err);
    })
  }

  componentDidMount() {
    this.getTeams();
    this.getMatches();
  }

  render() {
    let { teams, matches, dataLoaded } = this.state;
    console.log(teams);
    if (dataLoaded) {
      return (
        <main>
          <div>
            <h1>WORLD CUP 2018 - TEAMS</h1>
            <Teams teams={teams}/>
          </div>
          <div>
            <h1>WORLD CUP 2018 - UPCOMING GAMES</h1>
            <Schedule matches={matches}/>
          </div>
        </main>
      )
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }
}

export default App;
