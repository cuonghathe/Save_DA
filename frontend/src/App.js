import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './layouts/Header';
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard'
import Register from './pages/Register/Register';
import RecipeDetails from './pages/Recipe/Recipe';
import CreateRecipe from './pages/Create_recipe/create_recipe';
import SearchResults from './components/searchResult';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/Recipe/:id' element={<RecipeDetails />} />
          <Route path='/Recipe/Create' element={<CreateRecipe />} />
          <Route path='/search' element={<SearchResults />} />
        </Routes>
        
      </BrowserRouter>
    </>
  );
}

export default App;