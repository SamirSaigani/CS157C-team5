// =============== Purpose ====================
// Entry point for the Express Server, defined in Package.json
// Acts as the central point for handling HTTP requests and responses
// How the frontend and backend interacts

import express from "express";


const app = express();

//When the Express server recieves an HTTP request starting with /api/products
//Go to routes/product.js to handle that request
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
