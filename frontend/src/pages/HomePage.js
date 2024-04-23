import React, { useState, useEffect } from 'react';

function HomePage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch the products when the component mounts
        fetch('http://localhost:8080/api/products', {
            method:'GET'
        }).then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error('Error fetching products:', error));

    }, []);

    return (
        <div>
            <nav>
                {/* Navigation bar content */}
                <h1>Product Listings</h1>
            </nav>
            <div className="product-grid">
                {products.map((product, index) => (
                    <div key={index} className="product-tile">
                        <img src={product.image} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>{product.brand}</p>
                        <a href={product.url}>More Details</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;
