import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.scss';

import Navbar from './components/Navbar';

import Section from './pages/Section';

class App extends Component {
  constructor() {
    super();
    this.state = {
        electionData: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/presidential_2016').then(response => {
        if (response.status !== 200) {
            console.log(`There was a problem: ${response.status}`);
            return;
        }
        response
          .json()
          .then(data => {
              this.setState({
                  electionData: data[0]
              });
          });
    });
  }

  render() {
    const { electionData} = this.state
    return (
      <Router>
        <div className="App">
          <Navbar/>
            <Switch>
              <Route
                path="/"
                component={()=>{ return <Section electionData={electionData}/>}}
              />
            </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
