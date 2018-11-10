import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { getEvents } from "./apis";
import Events from "./Events";
import Event from "./Event";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  componentDidMount() {
    getEvents().then(events => this.setState({ events }));
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={props => <Events {...props} events={this.state.events} />}
          />
          <Route path="/event/:id" render={props => <Event {...props} />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
