import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup, Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/recipe/api/getRecipes");
        setRecipes(response.data.allRecipeData);
      } catch (error) {
        console.error("Lỗi tải dữ liệu", error);
        setError("Lỗi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleDeleteRecipe = async (recipeId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa công thức này?")) return;

    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:5000/recipe/api/delete/${recipeId}`, {
        headers: { Authorization: `${token}` },
      });
      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== recipeId));
    } catch (err) {
      setError("Lỗi khi xóa công thức.");
    }
  };

  const handleNavigateRecipe = (id) => {
    navigate(`Recipe/${id}`);
  };

  if (loading) return <p>Đang tải danh sách công thức...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <Container className="recipe-management">
      <h2 className="mb-4 text-center">Quản lý công thức</h2>

      <ListGroup>
        {recipes.length === 0 ? <p>Không có công thức nào.</p> : null}
        {recipes.map((recipe) => (
          <ListGroup.Item key={recipe._id} className="d-flex justify-content-between align-items-center">
            <span>
              <strong>{recipe.recipename}</strong> - {recipe.description}
            </span>
            <div>
              <button className="btn btn-success btn-sm me-2" onClick={() => handleNavigateRecipe(recipe._id)}>
                Xem
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteRecipe(recipe._id)}>
                Xóa
              </button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default RecipeList;
