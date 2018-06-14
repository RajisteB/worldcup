import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { API_KEY } from './config.js';

class App extends Component {

  getCalendar = () => {
    axios({
      method: 'get',
      url: 'https://stroccoli-sebasfreetest-v1.p.mashape.com/calendar',
      headers: { 'X-Mashape-Key' : API_KEY }
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }

  componentDidMount() {
    this.getCalendar();
  }

  render() {
    return (
      <div>
        <h2>WORLD CUP 2018</h2>
      </div>
    );
  }
}

export default App;
