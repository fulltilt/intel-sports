import React from "react";
import $ from "jquery";
import { getEvent, submitContent } from "./apis";
import { Link } from "react-router-dom";
import AddContentModal from "./AddContentModal";
import "./App.css";

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      eventClips: [],
      newEventId: "",
      isFeatured: false,
      contentType: "",
      category: "",
      tags: "",
      message: "",
      error: ""
    };
  }

  componentDidMount() {
    getEvent(this.state.id).then(evt =>
      this.setState({ eventClips: evt.eventClips, eventId: evt.eventId })
    );
  }

  handleChange = evt => {
    let { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  submitContent = evt => {
    evt.preventDefault();
    submitContent(this.state)
      .then(res => {
        $("#exampleModal").modal("toggle");
        this.setState({ message: res.message });
        setTimeout(() => {
          $("#success").alert("close");
        }, 3000);
      })
      .catch(err => {
        this.setState({ message: err });
        setTimeout(() => {
          $("#danger").alert("close");
        }, 3000);
      });
  };

  render() {
    let {
      eventClips,
      eventId,
      contentType,
      isFeatured,
      category,
      newEventId,
      tags
    } = this.state;
    let fields = {
      contentType,
      isFeatured,
      category,
      newEventId,
      tags
    };
    return (
      <div className="container">
        <h2 className="row justify-content-md-center">Event {eventId}</h2>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Tags</th>
              <th scope="col">Category</th>
              <th scope="col">Featured</th>
              <th scope="col">Content Type</th>
            </tr>
          </thead>
          <tbody>
            {eventClips.length > 0
              ? eventClips.map(clip => (
                  <tr key={clip.metadataId}>
                    <td>{clip.tags ? clip.tags.join(", ") : ""}</td>
                    <td>{clip.category}</td>
                    <td>{clip.isFeatured ? "Yes" : "No"}</td>
                    <td>{clip.contentType}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Add Content
        </button>
        <button type="button" className="btn btn-link">
          <Link to="/">Back</Link>
        </button>
        {this.state.message ? (
          <div className="alert alert-success" id="success" role="alert">
            {this.state.message}
          </div>
        ) : null}

        {this.state.error ? (
          <div className="alert alert-danger" id="danger" role="alert">
            {this.state.error}
          </div>
        ) : null}

        <AddContentModal
          handleChange={this.handleChange}
          submitContent={this.submitContent}
          fields={fields}
        />
      </div>
    );
  }
}

export default Event;
