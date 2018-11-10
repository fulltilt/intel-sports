import React from "react";
import { Link } from "react-router-dom";

const Events = props => (
  <div className="main">
    <div className="container">
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
          {props.events.length > 0
            ? props.events.map(evt => {
                return (
                  <tr key={evt.eventId}>
                    <th scope="row">
                      <Link to={`/event/${evt.eventId}`}>{evt.eventId}</Link>
                    </th>
                    <td>{evt.league}</td>
                    <td>{evt.eventType}</td>
                    <td>{new Date(evt.date).toLocaleDateString("en-US")}</td>
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
    </div>
  </div>
);

export default Events;
