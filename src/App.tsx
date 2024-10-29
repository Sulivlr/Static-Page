import Appbar from './components/Appbar/Appbar';
import {Route, Routes} from 'react-router-dom';
import Home from './components/containers/Home/Home';
import Page from './components/containers/Page/Page';
import Admin from './components/containers/Admin/Admin';

const App = () => {
  return (
    <>
      <header>
        <Appbar/>
      </header>
      <main className="container-fluid">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/admin" element={<Admin/>}></Route>
          <Route path="/:pageName" element={<Page/>}></Route>
        </Routes>
      </main>
    </>
  );
};

export default App;
