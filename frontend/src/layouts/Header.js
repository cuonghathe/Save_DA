import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Form } from 'react-bootstrap';
import axios from 'axios';
import "./header.scss";

const Header = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('authToken');
    const [searchTerm, setSearchTerm] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        
        if (!searchTerm.trim()) {
            console.warn("Search term is empty");
            return;
        }
    
        try {
            const response = await axios.get(`http://localhost:5000/recipe/api/search/${encodeURIComponent(searchTerm)}`);
            navigate('/search', { state: { results: response.data } });
        } catch (error) {
            console.error('Failed to search recipes:', error);
        }
    };

    return (
        <>
            <header>
                <Navbar bg="dark" data-bs-theme="dark" style={{ width: "100%" }}>
                    <Container>
                        <NavLink to='/' className="text-decoration-none text-light mx-2" style={{ fontSize: "24px" }}>TastyEcho</NavLink>
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/Recipe/Create">Tạo công thức</Nav.Link>
                        </Nav>

                        <Nav className='text-mid'>
                            <Form className='d-flex' style={{ maxWidth: "400px", width: "100%" }} onSubmit={handleSearch}>
                                <Form.Control
                                    type="text"
                                    placeholder="Tìm kiếm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button type="submit" style={{ position: "absolute", right: "6px", top: "8px", cursor: "pointer", border: "none", background: "none" }}>
                                    <i className="fa-solid fa-search"></i>
                                </button>
                            </Form>
                        </Nav>

                        {isLoggedIn ? (
                            <Nav className="ml-auto">
                                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            </Nav>
                        ) : (
                            <Nav className="ml-auto">
                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/register">Register</Nav.Link>
                            </Nav>
                        )}
                    </Container>
                </Navbar>
            </header>
        </>
    );
};

export default Header;