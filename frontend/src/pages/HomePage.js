import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Modal, Card, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import '../styles/HomePage.css';

const HomePage = () => {
    const [showModal, setShowModal] = useState(false);
    const [addProductModal, setAddProductModal] = useState(false);
    const [showAccountModal, setShowAccountModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({});
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        url: '',
        image_url: '',
        id: ''
    });
    const [userName, setUserName] = useState('');
    const userId = sessionStorage.getItem('userEmail'); // This should come from user session or state
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) { // If there is no user email in session storage
            navigate('/', { replace: true }); // Redirect to landing page
        }
        else {
            // Get users products to fill homepage content
            fetch(`http://localhost:8080/api/products/${userId}`)
            .then(res => res.json())
            .then(setProducts)
            .catch(console.error);

            // Get users name
            fetch(`http://localhost:8080/api/user/${userId}/name`)
            .then(res => res.json())
            .then(data => setUserName(data.name))
            .catch(console.error);
        }
    }, [userId, navigate]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:8080/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData, userId })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setProducts([...products, formData]);
            setFormData({ name: '', brand: '', url: '', image_url: '' });
            //alert('Product added successfully!');
            handleCloseAddProductModal();
        })
        .catch(error => {
            console.error('Error adding product:', error);
            alert('Failed to add product');
        });
    };

    /* Modal for Account Icon */
    const handleAccountIconClick = () => {
        setShowAccountModal(true);
    };
      
      const handleAccountModalClose = () => {
        setShowAccountModal(false);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('userEmail'); // Remove the user email from session storage
        navigate('/', { replace: true }); // Redirect to the landing page
    };

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

    /* Modal Handling for adding products */
    const handleAddProduct = () => {
        setAddProductModal(true);
    };
    
    const handleCloseAddProductModal = () => {
        setAddProductModal(false);
    };

    /* Modal Handling when user clicks '...' on card */
    const handleEdit = (product, event) => {
        event.stopPropagation();
        setCurrentProduct(product);
        setFormData(product);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleSaveChanges = () => {
        const { id, name, brand, url, image_url } = currentProduct;
        //const userId = "DN@gmail.com"; // This should come from user session or state
      
        fetch(`http://localhost:8080/api/products/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId, name, brand, url, image_url })
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Something went wrong');
        })
        .then(data => {
          console.log('Product updated successfully:', data);
          setProducts(prevProducts => prevProducts.map(p => p.id === currentProduct.id ? { ...p, ...currentProduct } : p))
          setShowModal(false);
        })
        .catch(error => {
          console.error('Error updating product:', error.message);
          alert('Failed to update product');
        });
    };
    
    const handleDelete = () => {
        fetch(`http://localhost:8080/api/products/${currentProduct.id}?userId=${userId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          params: {
            userId
          }
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Something went wrong');
        })
        .then(data => {
          console.log('Product deleted successfully:', data);
          setProducts(prevProducts => prevProducts.filter(p => p.id !== currentProduct.id));
          setShowModal(false);
        })
        .catch(error => {
          console.error('Error deleting product:', error);
          alert('Failed to delete product');
        });
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
        <Container>
            <h1> </h1>
            <Button variant="primary" onClick={handleAddProduct}>Add Product</Button>
            <div className="account-icon">
                <AccountCircle style={{ fontSize: 30, position: 'absolute', top: 10, right: 10 }} onClick={handleAccountIconClick} />
            </div>
            <div>
                <h2>Your Products</h2>
                <div className="product-grid">
                    {products.map((product, index) => (
                        <a href={product.url} target="_blank" rel="noopener noreferrer" key={index} className="card-link">
                            <Card className="card-custom">
                                <Card.Img src={product.image_url} alt={product.name} className="card-img-top" />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>{product.brand}</Card.Text>
                                    {/* <Card.Text>{product.id}</Card.Text> */}
                                    <button className="ellipsis-button" onClick={(e) => {
                                    e.preventDefault();
                                    handleEdit(product, e);
                                    }}>
                                    &#x2026;  {/* HTML entity for ellipsis */}
                                    </button>
                                </Card.Body>
                            </Card>
                        </a>
                    ))}
                </div>
            </div>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="productName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product name"
                                value={currentProduct.name}
                                onChange={e => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="productBrand">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter brand"
                                value={currentProduct.brand}
                                onChange={e => setCurrentProduct({ ...currentProduct, brand: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="productUrl">
                            <Form.Label>URL</Form.Label>
                            <Form.Control
                                type="url"
                                value={currentProduct.url}
                                onChange={e => setCurrentProduct({ ...currentProduct, url: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="productImageUrl">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="url"
                                value={currentProduct.image_url}
                                onChange={e => setCurrentProduct({ ...currentProduct, image_url: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                    <Button variant="danger" onClick={handleDelete} style={{ position: 'absolute', left: 15 }}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={addProductModal} onHide={handleCloseAddProductModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>URL</Form.Label>
                        <Form.Control
                        type="url"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                        required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                        type="url"
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleChange}
                        required
                        />
                    </Form.Group>
                    <Button type="submit">Add Product</Button>
                    </Form>
                </Modal.Body>
            </Modal>


        </Container>
        </>
    );
};

export default HomePage;
