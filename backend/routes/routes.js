const express = require('express');
const router = express.Router();
const redisClient = require('../redis-client');
const bcrypt = require('bcrypt');

// Use router.post instead of app.post
router.post('/signup', async (req, res) => {
    const { email, password, name } = req.body;
    try {
        // In real applications, ensure that the password is hashed before storing
        const hashedPassword = await bcrypt.hash(password, 10); // '10' is the salt rounds
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

module.exports = router;
