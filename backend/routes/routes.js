const express = require('express');
const router = express.Router();
const redisClient = require('../redis-client');
const bcrypt = require('bcrypt');

// Signup endpoint
router.post('/signup', async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        await redisClient.hSet(`user:${email}`, {
            password: hashedPassword,
            name: name,
            productListKey: `user:${email}:products`
        });

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error saving user to Redis', error);
        res.status(500).json({ message: 'Error saving user data' });
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userData = await redisClient.hGetAll(`user:${email}`);

        if (!userData || Object.keys(userData).length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordIsValid = await bcrypt.compare(password, userData.password);
        if (!passwordIsValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Logged in successfully', user: { email, name: userData.name } });
    } catch (error) {
        console.error('Error logging in user', error);
        res.status(500).json({ message: 'Error logging in user' });
    }
});

// Add a new product and link it to a user
router.post('/api/products', async (req, res) => {
    const { userId, name, brand, url, image_url } = req.body;
    try {
        const productId = Date.now();  // Simple unique ID generation
        const productKey = `user:${userId}:product:${productId}`;
        await redisClient.hSet(productKey, {
            name, brand, url, image_url, id: productId
        });
        await redisClient.rPush(`user:${userId}:products`, productKey);

        res.status(201).json({ message: 'Product added successfully', productId });
    } catch (error) {
        console.error('Failed to add product:', error);
        res.status(500).json({ error: 'Failed to add product' });
    }
});

// Get all products for a user
router.get('/api/products/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const productKeys = await redisClient.lRange(`user:${userId}:products`, 0, -1);
        const products = await Promise.all(productKeys.map(key => redisClient.hGetAll(key)));

        res.status(200).json(products);
    } catch (error) {
        console.error('Failed to retrieve products:', error);
        res.status(500).json({ error: 'Failed to retrieve products' });
    }
});

// Update a product
router.put('/api/products/:productId', async (req, res) => {
    const { userId, name, brand, url, image_url } = req.body;
    const { productId } = req.params;

    const productKey = `user:${userId}:product:${productId}`;
    try {
        // Check if product exists
        const exists = await redisClient.exists(productKey);
        if (!exists) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update product data in Redis
        await redisClient.hSet(productKey, { name, brand, url, image_url });
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Failed to update product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
});

// Delete a product
router.delete('/api/products/:productId', async (req, res) => {
    const userId = req.query.userId; // Retrieve userId from query parameters
    const { productId } = req.params;

    const productKey = `user:${userId}:product:${productId}`;
    try {
        // Check if product exists
        const exists = await redisClient.exists(productKey);
        if (!exists) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Remove the product from Redis
        await redisClient.del(productKey);

        // Also remove the product key from the list of products
        await redisClient.lRem(`user:${userId}:products`, 0, productKey);

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Failed to delete product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

module.exports = router;
