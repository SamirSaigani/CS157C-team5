// =============== Purpose ====================
// Entry point for the Express Server, defined in Package.json
// Acts as the central point for handling HTTP requests and responses
// How the frontend and backend interacts


const express = require('express');
const cors = require('cors');
const app = express();

// CORS options, you can define more specific options here
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue : false,
  optionsSuccessStatus: 204,
};

app.options('*',cors())

// Use CORS middleware with options
app.use(cors(corsOptions));

// Body parser middleware, allow JSON body in HTTP requests
app.use(express.json());

// Route handler for the root URL
app.get('/', (req, res) => {
  res.send('API Server');
});

//When the Express server recieves an HTTP request starting with /api/products
//Go to routes/product.js to handle that request
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
