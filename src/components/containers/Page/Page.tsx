import {useParams} from 'react-router-dom';

const Page = () => {

  const {pageName} = useParams();
  return (
    <div>
      Page is {pageName}
    </div>
  );
};

export default Page;