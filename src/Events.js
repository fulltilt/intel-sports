import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { getEvents } from "./apis";
import Pagination from "./Pagination";
import Sidebar from "./ Sidebar";

// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.
const routes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <div>nba!</div>,
    main: () => <h2>NBA</h2>
  },
  {
    path: "/nfl",
    sidebar: () => <div>nfl!</div>,
    main: () => <h2>NFL</h2>
  }
];

class Events extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      events: [],
      currentEvents: [],
      currentPage: null,
      totalPages: null
    };
  }

  componentDidMount() {
    getEvents().then(events => this.setState({ events }));
  }

  rowClicked = eventId => {
    this.context.router.history.push(`/event/${eventId}`);
  };

  onPageChanged = data => {
    const { events } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentEvents = events.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentEvents, totalPages });
  };

  render() {
    const { events, currentEvents, currentPage, totalPages } = this.state;
    const totalEvents = events.length;

    if (totalEvents === 0) return null;

    return (
      <div className="main">
        <div className="row">
          <Sidebar />
          <div className="container col-md-9 ml-sm-auto col-lg-10 px-4">
            <h2 className="row justify-content-md-center">Events</h2>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Event ID</th>
                  <th scope="col">League</th>
                  <th scope="col">Event Type</th>
                  <th scope="col">Date</th>
                  <th scope="col">Home</th>
                  <th scope="col">Away</th>
                  <th scope="col">Venue</th>
                  <th scope="col">City</th>
                </tr>
              </thead>
              <tbody>
                {currentEvents.length > 0
                  ? currentEvents.map(evt => {
                      return (
                        <tr
                          key={evt.eventId}
                          onClick={() => this.rowClicked(evt.eventId)}
                        >
                          <th scope="row">{evt.eventId}</th>
                          <td>{evt.league}</td>
                          <td>{evt.eventType}</td>
                          <td>
                            {new Date(evt.date).toLocaleDateString("en-US")}
                          </td>
                          <td>{evt.homeTeam.name}</td>
                          <td>{evt.awayTeam.name}</td>
                          <td>{evt.venue.name}</td>
                          <td>{evt.venue.city}</td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>

            <div className="container mb-5">
              <div className="row d-flex flex-row">
                <div className="w-100 px-4 d-flex flex-row flex-wrap align-items-center justify-content-between">
                  <div className="d-flex flex-row align-items-center">
                    <h2>
                      <strong className="text-secondary">{totalEvents}</strong>{" "}
                      Events
                    </h2>

                    {currentPage && (
                      <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                        Page{" "}
                        <span className="font-weight-bold">{currentPage}</span>{" "}
                        / <span className="font-weight-bold">{totalPages}</span>
                      </span>
                    )}
                  </div>

                  <div className="d-flex flex-row py-4 align-items-center">
                    <Pagination
                      totalRecords={totalEvents}
                      pageLimit={20}
                      pageNeighbors={1}
                      onPageChanged={this.onPageChanged}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Events;
