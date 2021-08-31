import React, { Component } from "react";
import './App.css';
import Navigatie from './Navigatie';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Regex from '../pages/Regex';
import Misc from '../pages/Misc';
import Vibes from '../pages/Vibes';
import Leveling from '../pages/Leveling';
import TwitterSettings from '../pages/TwitterSettings';
import DiscordSettings from '../pages/DiscordSettings';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {apiResponse: ""};
  }

  callAPI() {
    fetch(`${process.env.REACT_APP_API_URL}/discord/settings`)
      .then(res => res.json())
      .then(res => this.setState({ apiResponse: res.basic.name }));
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navigatie page="hier"/>
            <div className="pageContent">
              <Switch>
                <Route exact path="/"> {/* https://www.youtube.com/watch?v=t7VmF4WsLCo */}
                  <Home />
                </Route>
                <Route path="/regex">
                  <Regex />
                </Route>
                <Route path="/misc">
                  <Misc />
                </Route>
                <Route path="/vibes">
                  <Vibes />
                </Route>
                <Route path="/leveling">
                  <Leveling />
                </Route>
                <Route path="/twitterSettings">
                  <TwitterSettings />
                </Route>
                <Route path="/discordSettings">
                  <DiscordSettings />
                </Route>
              </Switch>
            </div>
          <p>{this.state.apiResponse}</p>
        </div>
      </Router>
    )
  }
}

export default App;
