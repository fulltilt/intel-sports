import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Events from "./Events";
import Event from "./Event";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={props => <Events {...props} />} />
          <Route path="/event/:id" render={props => <Event {...props} />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
