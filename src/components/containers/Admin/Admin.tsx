import React from 'react';
import ButtonSpinner from '../../ButtonSpinner/ButtonSpinner';
import {PAGES} from '../../../constants';

const Admin = () => {

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <h2>Edit Pages</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="pageId">Select Page</label>
          <select
            name="pageId"
            id="pageId"
            required
            className="form-select"
          >
            <option value="">Select a page</option>
            {PAGES.map((page) => (
              <option key={page.pageId} value={page.pageId}>{page.title}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text"
                 name="title"
                 id="title"
                 required
                 className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            id="content"
            className="form-control"
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-2"
          disabled={false}
        >
          {false && <ButtonSpinner />}
          Save
        </button>
      </form>
    </>
  );
};

export default Admin;