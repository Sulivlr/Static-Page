import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {PAGES} from '../../../constants';
import {ApiPage} from '../../../types';
import axiosApi from '../../../../axiosApi';
import {useNavigate} from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';
import ButtonSpinner from '../../ButtonSpinner/ButtonSpinner';

const initialState = {
  title: '',
  content: '',
};

const Admin = () => {


  const navigate = useNavigate();
  const [pageMutation, setPageMutation] = useState<ApiPage>(initialState);
  const [pageId, setPageId] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const onFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    setPageMutation((prevState) => ({
      ...prevState, [name]: value,
    }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    try {
    event.preventDefault();
    setIsUpdating(true);
    await axiosApi.put(`/pages/${pageId}.json`, pageMutation);
    navigate(`/${pageId}`);
    } finally {
      setIsUpdating(false);
    }
  };

  const fetchPage = useCallback(async () => {
    try {
      setNotFound(false);
      setIsFetching(true);
      const {data: page} = await axiosApi.get<ApiPage | null>(`/pages/${pageId}.json`);
      if (page === null) {
        setPageMutation(initialState);
        setNotFound(true);
      } else {
        setPageMutation(page);
      }
    } finally {
      setIsFetching(false);
    }
  }, [pageId]);

  useEffect(() => {
    void fetchPage();
  }, [fetchPage]);

  return (
    <>
      <h2>Edit Pages</h2>
      {isFetching ? <Spinner /> : (
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="pageId">Select Page</label>
          <select
            name="pageId"
            id="pageId"
            required
            className="form-select"
            value={pageId === null ? '' : pageId}
            onChange={(event) => setPageId(event.target.value)}
          >
            <option value="">Select a page</option>
            {PAGES.map((page) => (
              <option key={page.pageId} value={page.pageId}>{page.title}</option>
            ))}
          </select>
        </div>
        {notFound ? (
          <h2>Select a page first</h2>
        ) : (
          <>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input type="text"
                     name="title"
                     id="title"
                     required
                     value={pageMutation.title}
                     onChange={onFieldChange}
                     className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                name="content"
                id="content"
                className="form-control"
                value={pageMutation.content}
                onChange={onFieldChange}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-2"
              disabled={isUpdating}
            >
              {isUpdating && <ButtonSpinner />}
              Save
            </button>
          </>
        )}
      </form>
      )}
    </>
  );
};

export default Admin;