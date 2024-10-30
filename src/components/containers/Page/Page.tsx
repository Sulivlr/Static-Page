import {useParams} from 'react-router-dom';
import {useCallback, useEffect, useState} from 'react';
import {ApiPage} from '../../../types';
import axiosApi from '../../../../axiosApi';
import Spinner from '../../Spinner/Spinner';

const Page = () => {
  const {pageName} = useParams();
  const [page, setPage] = useState<ApiPage | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchPage = useCallback(async () => {
    try {
      setLoading(true);
      const {data: page} = await axiosApi.get<ApiPage | null>(`/pages/${pageName}.json`);
      setPage(page);
      if (page === null) {
        setNotFound(true);
      }
    } finally {
      setLoading(false);
    }
  }, [pageName]);

  useEffect(() => {
    void fetchPage();
  }, [fetchPage]);

  let content = <Spinner />;

  if (!loading && page) {
    content = (
      <>
        <h1>{page.title}</h1>
        <article>{page.content}</article>
      </>
    );
  }

  if (!loading && notFound) {
    content = <h1>Page not Found!</h1>;
  }

  return (
    <div className="mt-2">
      {content}
    </div>
  );
};

export default Page;