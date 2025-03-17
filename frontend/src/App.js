import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Register from './pages/Register/Register';
import RecipeDetails from './pages/Recipe/Recipe';
import CreateRecipe from './pages/Create_recipe/create_recipe';
import SearchResults from './components/searchResult';
import AdminPanel from './pages/Admin/Adminpanel';
import AdminTemplate from './components/admin_template';
import UserTemplate from './components/user_template';
import UserList from './pages/Admin/Userlist/userlist';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    return decoded.isAdmin ? children : <Navigate to="/" />;
  } catch (error) {
    console.error("Error decoding token:", error);
    return <Navigate to="/login" />;
  }
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserTemplate />}>
          <Route index element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="Recipe/:id" element={<RecipeDetails />} />
          <Route path="Recipe/Create" element={<CreateRecipe />} />
          <Route path="search" element={<SearchResults />} />
        </Route>

        <Route path="/admin" element={<PrivateRoute><AdminTemplate /></PrivateRoute>}>
          <Route index element={<AdminPanel />} />
          <Route path="User/Manage" element={<UserList />} />
          <Route path="Recipe/:id" element={<RecipeDetails />} />
          <Route path="Recipe/Create" element={<CreateRecipe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
