import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'name':
                setName(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, name }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data); // handle response
                alert('Signup successful!');
                // Reset form or handle next steps here
                setEmail('');
                setPassword('');
                setName('');
                window.location.href = "/Login";
            } else {
                console.error('Failed to fetch:', response.statusText);
                alert('Signup failed!');
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Network error: Please try again.');
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <Card className="w-100" style={{ maxWidth: '400px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={name} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={email} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={password} onChange={handleChange} required />
                        </Form.Group>
                        <Button className="w-100 my-3" type="submit">Sign Up</Button>
                        <Button className="w-100" variant="light" onClick={() => navigate("/Login")} style={{ color: 'black' }}>Log In</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default SignIn;
