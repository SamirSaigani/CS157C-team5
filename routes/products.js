// =============== Purpose ====================
// Define API endpoints specifically for product-related operations

const express = require('express');
const router = express.Router();
const redisClient = require('../redis-client');

// =============== ASYNC FUNCTIONS ====================

async function getProductURL(req, res) {
    try {
        // Get the Redis Key from the HTTP Request
        // Example of a HTTP request: http://localhost:3000/api/products/123/456
        // 123 is user id and 456 is product id
        const { userId, productId } = req.params;
        const redisKey = `user_id:${userId}:product_id:${productId}`;
        const productData = await redisClient.hGet(redisKey, 'url');

        if (productData) {
            // If product data is found in Redis, send it as response
            res.json({ productURL: productData });
        } else {
            // Handle case where product is not found in Redis
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error fetching product URL:', error);
        res.status(500).json({ message: 'Error fetching product URL' });
    }
}

async function createProduct(req, res) {
    try {
        const { userId, productId, title, brand, url, image } = req.body;
        const redisKey = `user_id:${userId}:product_id:${productId}`;

        
        // Using Redis HSET to store the product data to DB
        await redisClient.hSet(redisKey, {
            title: title,
            brand: brand,
            url: url,
            image: image
        });

        //S end a success response
        res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
        console.error('Error in createProduct:', error);
        res.status(500).json({ message: 'Error processing your request' });
    }
}

// =============== ROUTER CALLS ====================
// Handles all HTTP requests that starts with /api/products

/**
 * Example of HTTP request: http://localhost:3000/api/products/123/456
 * The Express server (index.js) listens for HTTP requests starting with /api/products, redirects it to products.js (here), 
 * matches the rest of the HTTP request, /:userId/:productId, to call the getProductURL function
 */
// Get route for getting the url link of the product
router.get('/:userId/:productId', getProductURL);

// Post route for creating a new product, HTTP request will hold a json body
router.post('/create', createProduct);

// =============== EXPORT RESPONSES ====================
module.exports = router;
