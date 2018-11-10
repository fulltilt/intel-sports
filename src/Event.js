import React from "react";
import $ from "jquery";
import { getEvent, submitContent } from "./apis";
import { Link } from "react-router-dom";
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
    let { eventClips, eventId } = this.state;
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

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="tags">Tags</label>
                    <input
                      type="text"
                      className="form-control"
                      name="tags"
                      id="tags"
                      value={this.state.tags}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="newEventId">Event ID</label>
                    <input
                      type="text"
                      className="form-control"
                      name="newEventId"
                      id="newEventId"
                      value={this.state.newEventId}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="category">Category</label>
                    <input
                      type="text"
                      className="form-control"
                      name="category"
                      id="category"
                      value={this.state.category}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="isFeatured">Featured</label>
                    <select
                      value={this.state.isFeatured}
                      className="custom-select d-block w-100"
                      name="isFeatured"
                      id="isFeatured"
                      onChange={this.handleChange}
                      required
                    >
                      <option value="">Choose...</option>
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="contentType">Type</label>
                    <input
                      type="text"
                      className="form-control"
                      name="contentType"
                      id="contentType"
                      value={this.state.contentType}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.submitContent}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Event;
