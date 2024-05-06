
import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';

const ShopPage = () => {
    const [products, setProducts] = useState([]);
   
    const userId = "DN@gmail.com"; // This should come from user session or state

    useEffect(() => {
        fetch(`http://localhost:8080/api/products/${userId}`)
            .then(res => res.json())
            .then(setProducts)
            .catch(console.error);
    }, []);

  

    return (
        <Container>
            <h1>CartConnect's</h1>
            
            <div>
                <h2>Shop now</h2>
                {products.map((product, index) => (
                    <Card key={index} style={{ marginBottom: '10px',maxWidth:'200px' }}>
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

export default ShopPage;
