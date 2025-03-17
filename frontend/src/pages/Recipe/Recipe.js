import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import "./Recipe.scss";

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [checkedIngredients, setCheckedIngredients] = useState([]);
    const [servings, setServings] = useState(1);
    const [adjustedIngredients, setAdjustedIngredients] = useState([]);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/recipe/api/singleRecipe/${id}`);
                setRecipe(response.data);
                setServings(response.data.servingSize);
                setAdjustedIngredients(response.data.ingredients);
            } catch (error) {
                console.error('Failed to fetch recipe:', error);
            }
        };

        fetchRecipe();
    }, [id]);

    const handleCheck = (ingredient) => {
        setCheckedIngredients(prevState =>
            prevState.includes(ingredient)
                ? prevState.filter(item => item !== ingredient)
                : [...prevState, ingredient]
        );
    };

    const adjustIngredients = (newServings) => {
        const adjustmentFactor = newServings / recipe.servingSize;
        const newIngredients = recipe.ingredients.map(ingredient => ({
            ...ingredient,
            quantity: Math.round(ingredient.quantity * adjustmentFactor * 100) / 100
        }));
        setAdjustedIngredients(newIngredients);
    };

    const handleServingsChange = (newServings) => {
        if (newServings > 0) {
            adjustIngredients(newServings);
            setServings(newServings);
        }
    };

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="recipe-container">
            <div className="recipe-header-details-container">
                <div className="recipe-header-container">
                    <div className="recipe-header">
                        <h1 className="recipe-title">{recipe.recipename}</h1>
                        <div className="recipe-image-container">
                            <Card className='recipe-image-card'>
                                <Card.Img variant="top" src={recipe.recipeImg || '/logo192.png'} />
                            </Card>
                        </div>
                    </div>
                </div>
                <div className="recipe-details">
                    <h4 className="recipe-author">Tác giả: <span className='review'>{recipe.userId.username}</span></h4>
                    <p className="recipe-rating">
                        Avg Rating: <span className='review'>3</span>&nbsp;
                        <i className='fa-solid fa-star star'></i>&nbsp;&nbsp;
                        <span className='review'>(3) reviews</span>&nbsp;&nbsp;
                        <span className='review'>Save <i className='fa-regular fa-heart' style={{ cursor: "pointer" }}></i></span>
                    </p>
                    <Card.Title>Thời gian nấu</Card.Title>
                    <p className="mb-4">{recipe.cookingTime}</p>

                    <Card.Title>Suất ăn</Card.Title>
                    <div className="mb-4">
                        <div className="d-flex align-items-center button-group-outline mt-2">
                            <ButtonGroup>
                                <Button variant="outline-secondary" onClick={() => handleServingsChange(servings - 1)}>-</Button>
                                <p className="mx-2 my-0 servings-display">{servings}</p>
                                <Button variant="outline-secondary" onClick={() => handleServingsChange(servings + 1)}>+</Button>
                            </ButtonGroup>
                        </div>
                    </div>
                </div>
            </div>

            <div className="recipe-ingredients-instructions">
                <Card className="ingredients-card">
                    <Card.Body>
                        <h4 className='mt-2'>Nguyên liệu</h4>
                        <Form>
                            {adjustedIngredients.map((ingredient, index) => (
                                <Form.Check
                                    key={index}
                                    type="checkbox"
                                    label={`${ingredient.name}: ${ingredient.quantity} (${ingredient.measurement})`}
                                    checked={checkedIngredients.includes(ingredient.name)}
                                    onChange={() => handleCheck(ingredient.name)}
                                    className={checkedIngredients.includes(ingredient.name) ? 'checked' : ''}
                                />
                            ))}
                        </Form>
                    </Card.Body>
                </Card>

                <Card className="instructions-card mt-4">
                    <Card.Body>
                        <h4 className='mt-2'>Cách làm</h4>
                        <Form>
                            {recipe.instructions.map((instruction, index) => (
                                <Form.Check
                                    key={index}
                                    type="checkbox"
                                    label={instruction}
                                    className='instruction-item'
                                />
                            ))}
                        </Form>
                    </Card.Body>
                </Card>
            </div>

            <div className="reviewdetails mt-4">
                <h2>Reviews (3)</h2>
                <p>Check out our <span style={{ borderBottom: "1px solid #d54215" }}>Community GuideLines </span> about reviews</p>
                <Button variant='primary'>
                    Add Review
                </Button>
                <div className="user_review mt-3">
                    <p>4 reviews</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mx-3">
                            <i className='fa-solid fa-sort' style={{ cursor: "pointer" }}></i>Sort
                        </p>
                        <p>
                            <i className="fa-solid fa-filter"></i>
                            Filter
                        </p>
                    </div>
                </div>

                <div className="final_review" style={{ maxWidth: "33rem" }}>
                    <div className="d-flex justify-content-start align-items-center mt-3">
                        <img src="/logo192.png" style={{ width: "50px", marginRight: "10px", borderRadius: "50%" }} alt="" />
                        <h5>harsh patel</h5>
                        <span className='mx-4 mb-1'></span>
                    </div>

                    <div className="mt-3 d-flex align-items-center">
                        <div style={{ width: "100px" }}>
                            <i className='fa-solid fa-star star'></i>
                            <i className='fa-solid fa-star star'></i>
                            <i className='fa-solid fa-star star'></i>
                        </div>
                        <div className="mx-4" style={{ fontSize: "12px" }}>
                            08/02/2025
                        </div>
                    </div>
                    <div className="mt-3">
                        <p>nice recipe</p>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default RecipeDetails;