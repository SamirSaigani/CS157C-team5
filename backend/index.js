// =============== Purpose ====================
// Entry point for the Express Server, defined in Package.json
// Acts as the central point for handling HTTP requests and responses
// How the frontend and backend interacts


const express = require('express');
const cors = require('cors');
//const productRoutes = require('./routes/products');
const routes = require('./routes/routes');
const app = express();

app.use(cors());
app.use(express.json());
//app.use(productRoutes);
app.use('/',routes);

const server = app.listen(8080, () => {
  console.log(`Server running on port ${server.address().port}`);
});
