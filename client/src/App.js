import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LandingPage from './Components/View/LandingPage/LandingPage';
import Signup from './Components/View/Signup/Signup';
import Login from './Components/View/Login/Login';
import './App.css';


export default class App extends Component {
  render() {
    return (
      <Router>
        <div >
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route path="/Login">
              <Login />
            </Route>
            <Route path="/Signup">
              <Signup />
            </Route>
          </Switch>
        </div>
        </Router>
    );
  }
}
