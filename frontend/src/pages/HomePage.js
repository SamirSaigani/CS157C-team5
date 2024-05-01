import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        url: '',
        image_url: ''
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
                {products.map((product, index) => (
                    <Card key={index} style={{ marginBottom: '10px' }}>
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>Brand: {product.brand}</Card.Text>
                            <Card.Text><a href={product.url} target="_blank" rel="noopener noreferrer">Visit product</a></Card.Text>
                            <Card.Img src={product.image_url} alt="product" />
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </Container>
    );
};

export default HomePage;
