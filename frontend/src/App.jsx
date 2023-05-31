import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Liste from './pages/Liste/Liste';
import Layout from './components/Layout/Layout';
// import Counter from './pages/Counter/Counter';
// import Users from './pages/Users/Users';
import FilmDetails from './pages/FilmDetails/FilmDetails';
import Categories from './pages/Categories/Categories';
import Favoris from './pages/Favoris/Favoris';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="counter" element={<Counter />} />
        <Route path="users" element={<Users />} />
        <Route path="about" element={<About />} /> */}
        <Route path="movie/:id" element={<FilmDetails />} />
        <Route path="liste" element={<Liste />} />
        <Route path="categories" element={<Categories />} />
        <Route path="preferences" element={<Favoris />} />
      </Routes>
    </Layout>
  );
}

export default App;
