import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Modal, Card } from 'react-bootstrap';
import '../styles/HomePage.css';

const HomePage = () => {
    const [showModal, setShowModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({});
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        url: '',
        image_url: '',
        id: ''
    });
    const userId = "DN@gmail.com"; // This should come from user session or state

    useEffect(() => {
        fetch(`http://localhost:8080/api/products/${userId}`)
            .then(res => res.json())
            .then(setProducts)
            .catch(console.error);
    }, []);

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
            alert('Product added successfully!');
        })
        .catch(error => {
            console.error('Error adding product:', error);
            alert('Failed to add product');
        });
    };

    /* Modal Handling when user clicks '...' on card */
    const handleEdit = (product, event) => {
        event.stopPropagation();
        setCurrentProduct(product);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleSaveChanges = () => {
        console.log('Save changes for', currentProduct.name);
        // Here you would typically handle the API call to update the product
        setShowModal(false);
    };

    return (
        <Container>
            <h1>Products</h1>
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
            <div>
                <h2>Product List</h2>
                <div className="product-grid">
                    {products.map((product, index) => (
                        <a href={product.url} target="_blank" rel="noopener noreferrer" key={index} className="card-link">
                            <Card className="card-custom">
                                <Card.Img src={product.image_url} alt={product.name} className="card-img-top" />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>{product.brand}</Card.Text>
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
                        {/* Add other fields as necessary */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default HomePage;
