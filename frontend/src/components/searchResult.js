import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';
import '../../src/pages/Dashboard/Dashboard.scss';

const SearchResults = () => {
    const location = useLocation();
    const { results } = location.state || { results: [] };

    return (
        <Container>
            <h1 className="text-center mt-5">Kết quả tìm kiếm</h1>
            <div className="recipecard">
                {results.map((recipe) => (
                    <Card key={recipe._id} style={{ maxWidth: '21rem', width: "100%", marginBottom: "15px", boxShadow: "0px 2px 20px #cfd8dc", height: "27rem", cursor: "pointer" }}>
                        <Card.Img style={{ width: "100%", height: "13rem" }} variant="top" src={recipe.recipeImg || '/logo192.png'} />
                        <Card.Body>
                            <Card.Title>{recipe.recipename}</Card.Title>
                            <Card.Text>
                                {recipe.description}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </Container>
    );
};

export default SearchResults;