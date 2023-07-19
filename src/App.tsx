import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search';
import Album from './components/Album';
import Favorites from './components/Favorites';
import ProfileEdit from './components/ProfileEdit';
import NotFound from './components/NotFound';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route path="/search" element={ <Search /> } />
        <Route path="/album/:id" element={ <Album /> } />
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/profile/edit" element={ <ProfileEdit /> } />
        <Route path="/*" element={ <NotFound /> } />
      </Route>
      <Route index element={ <Login /> } />
    </Routes>
  );
}

export default App;
