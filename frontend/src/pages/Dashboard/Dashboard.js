import React, { useEffect, useState } from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.scss';

const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/recipe/api/getRecipes');
        setRecipes(response.data.allRecipeData);
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const handleNavigateRecipe = (id) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <Container>
      <h1 className="text-center mt-5">Recipe</h1>
      <div className="recipecard">
        {recipes.map((recipe) => (
          <Card key={recipe._id} style={{ maxWidth: '21rem', width: "100%", marginBottom: "15px", boxShadow: "0px 2px 20px #cfd8dc", height: "27rem", cursor: "pointer" }}>
            <Card.Img style={{ width: "100%", height: "13rem" }} variant="top" src={recipe.recipeImg || '/logo192.png'} />
            <Card.Body>
              <Card.Title>{recipe.recipename}</Card.Title>
              <Card.Text>
                {recipe.description}
              </Card.Text>
              <Card.Text>
                <small className="text-muted">Review({recipe.reviewCount})</small>              </Card.Text>
              <Button variant="outline-danger" onClick={() => handleNavigateRecipe(recipe._id)}>View Recipe</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default Dashboard;