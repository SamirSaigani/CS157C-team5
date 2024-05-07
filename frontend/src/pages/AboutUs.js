import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Modal, Card, Navbar, Nav, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import featureImage from './image.png';
import { useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';



const AboutUs = () => {
    const [showAccountModal, setShowAccountModal] = useState(false);
    const [userName, setUserName] = useState('');
      
      const handleAccountModalClose = () => {
        setShowAccountModal(false);
    };

    const userId = sessionStorage.getItem('userEmail');
    const navigate = useNavigate();

    const handleDeleteAccount = () => {
        fetch(`http://localhost:8080/api/account/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Something went wrong');
        })
        .then(data => {
        console.log('Account deleted successfully:', data);
        // Add code to handle successful account deletion (e.g., redirect to login page)
        navigate('/login', { replace: true });
        })
        .catch(error => {
        console.error('Error deleting account:', error);
        alert('Failed to delete account');
        });
    };

    const handleLogout = () => {
        sessionStorage.removeItem('userEmail'); // Remove the user email from session storage
        navigate('/', { replace: true }); // Redirect to the landing page
    };
    return (
        <>
        <Navbar style={{ backgroundColor: '#6c757d' }} variant="light">
            <Container>
                <Navbar.Brand href="/HomePage">CartConnect</Navbar.Brand>
                <Nav className="me-auto">
                        <Link to="/AboutUs" className="nav-link">About Us</Link>
                </Nav>

                <Modal show={showAccountModal} onHide={handleAccountModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Account</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <div className="account-circle-container">
                    <AccountCircle style={{ fontSize: 40 }} />
                    </div>
                    <h5 className="mt-3">{userName}</h5>
                    <p>{userId}</p>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-between">
                    <Button variant="danger" onClick={handleDeleteAccount}>
                        Delete Account
                    </Button>
                    <Button variant="dark" onClick={handleLogout}>
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>
            </Container>
        </Navbar>
            <Container className="d-flex flex-column align-items-center justify-content-start" style={{ minHeight: "100vh", backgroundColor: "#ADD8E6", padding: "20px" }}>
                <h1 className="mt-4">About Us</h1>
                <p>
                    CartConnect aims to streamline the online shopping experience by providing a user-friendly platform
                    to manage products effectively. Features include product management, real-time updates, and user customization
                    options to enhance your shopping experience.
                </p>

                <Image 
                    src={featureImage} 
                    alt="Feature Image" 
                    className="mb-4" 
                    style={{ width: "50%" }} 
                />
                
                <h2 className="mt-4">Our Team</h2>
                <div className="team-grid">
                    {[
                        { name: "Nachiketh Mamidi", role: "Teammate" },
                        { name: "Russel", role: "Teammate" },
                        { name: "Sam", role: "Teammate" }
                    ].map(member => (
                        <Card key={member.name} className="m-2" style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{member.name}</Card.Title>
                                <Card.Text>{member.role}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </Container>
        </>
    );
};

export default AboutUs;
