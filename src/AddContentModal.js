import React from "react";

const AddContentModal = props => (
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
                value={props.fields.tags}
                onChange={props.handleChange}
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
                value={props.fields.newEventId}
                onChange={props.handleChange}
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
                value={props.fields.category}
                onChange={props.handleChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="isFeatured">Featured</label>
              <select
                value={props.fields.isFeatured}
                className="custom-select d-block w-100"
                name="isFeatured"
                id="isFeatured"
                onChange={props.handleChange}
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
                value={props.fields.contentType}
                onChange={props.handleChange}
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
            onClick={props.submitContent}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default AddContentModal;
