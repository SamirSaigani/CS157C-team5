import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Define the directory where your HTML files are located
const htmlDirectory = path.dirname(new URL(import.meta.url).pathname);

// Route handler for the root URL
app.get('/', (req, res) => {
  res.sendFile('index.hml', { root: htmlDirectory });
});

// Body parser middleware, allow JSON body in HTTP requests
app.use(express.json());

// Define your product routes
const productRoutes = express.Router();

// When the Express server receives an HTTP request starting with /api/products
// Go to routes/product.js to handle that request
app.use('/api/products', productRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
