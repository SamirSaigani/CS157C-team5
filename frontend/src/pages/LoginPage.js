import React, { useState } from 'react';
import { Form, Button, Container, Card, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                alert('Login successful!');
                sessionStorage.setItem('userEmail', email);
                navigate("/HomePage");
            } else {
                console.error('Failed to fetch:', response.statusText);
                alert('Login failed!');
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Network error: Please try again.');
        }
    };

    return (
        <>
            <Navbar style={{ backgroundColor: '#6c757d' }} variant="light">
                <Container>
                    <Navbar.Brand href="/">CartConnect</Navbar.Brand>
                </Container>
            </Navbar>
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", backgroundColor: "#ADD8E6" }}>
                <Card className="w-100" style={{ maxWidth: '400px' }}>
                    <Card.Body>
                        <h2 className="text-center mb-4">Login</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" value={email} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" value={password} onChange={handleChange} required />
                            </Form.Group>
                            <Button className="w-100" type="submit">Login</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default Login;
