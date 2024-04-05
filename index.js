/**
 * Package.json explains how the Node.js server is set up
 * The entry point of the Node.js server is the index.js (Here)
 * 
 * Acts as the central point for handling HTTP requests and responses (How the frontend interacts with the backend)
 */
const express = require('express');
const app = express();

//When the Express server recieves an HTTP request starting with /api/products
//Go to routes/product.js to handle that request
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
