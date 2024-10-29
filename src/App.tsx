import Appbar from './components/Appbar/Appbar';
import {Route, Routes} from 'react-router-dom';

const App = () => {
  return (
    <>
      <header>
        <Appbar />
      </header>
      <main className="container-fluid">
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/about"  element={<h1>About</h1>}/>
          <Route path="/contacts"  element={<h1>Contacts</h1>}/>
          <Route path="/divisions"  element={<h1>Divisions</h1>}/>
          <Route path="/admin"  element={<h1>Admin</h1>}/>
          <Route path="*"  element={<h1>Page Doesn't Exist</h1>}/>
        </Routes>
      </main>
    </>
  );
};

export default App;
