/**
 * Define API endpoints specifically for product-related operations
 */

const express = require('express');
const router = express.Router();
const redisClient = require('../redis-client');

/**
 * ASYNC FUNCTIONS
 */

async function getProductURL(req, res) {
    try {
        // Get the Redis Key from the HTTP Request
        // Example of a HTTP request: http://localhost:3000/api/products/123/456
        // 123 is user id and 456 is product id
        const { userId, productId } = req.params;
        const redisKey = `user_id:${userId}:product_id:${productId}`;
        const productData = await redisClient.get(redisKey);

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

/**
 * ROUTER CALLS
 * 
 * Handles all HTTP requests that starts with /api/products
 */

/**
 * Example of HTTP request: http://localhost:3000/api/products/123/456
 * The Express server (index.js) listens for the /api/products, redirects it to products.js (here), 
 * matches /:userId/:productId to call the getProductURL function
 */
router.get('/:userId/:productId', getProductURL);

/**
 * EXPORT RESPONSES
 */
module.exports = router;
