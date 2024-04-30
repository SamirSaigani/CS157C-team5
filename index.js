import express from 'express';
// import the directory path from 
import {dirname} from 'path'
import { fileURLToPath } from 'url';
var __dirname = dirname(fileURLToPath(import.meta.url))

import path from 'path';
// import { fileURLToPath } from 'url';

const app = express();

const PORT = process.env.PORT || 3000;

// Define the directory where your HTML files are located
const htmlDirectory = 'CS157c-teams';
app.use(express.json());
//set the path for the static file
app.use(express.static(path.join(__dirname,'./assets')))
// console.log("'assets path",path.join(__dirname,'assets'))
//set the views templating engine
app.set('view engine','ejs');
//set the path where our views are stored
const viewsPath=path.join(__dirname,'./views')
app.set('views',viewsPath)
// Route handler for the root URL
app.get('/', (req, res) => {
 // res.sendFile(path.join(htmlDirectory, 'index.html')
 //app to display the index page
 res.render('./index',{})
});

// Body parser middleware, allow JSON body in HTTP requests


// Define your product routes
// const productRoutes = express.Router();
import productRoutes from './routes/ProductRoutes.js';
import AdminUserRoutes from './routes/AdminUserRoutes.js';
// When the Express server receives an HTTP request starting with /api/products
// Go to routes/product.js to handle that request
app.use('/', productRoutes);
//api to handle all admin users profile management
app.use('/', AdminUserRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//wait for 5 sec for the server to connect then call the test functions
//This is mainly for test
import Users from './logics/users.js'
setTimeout(function () {
//call create user function
Users.createUser({name: "Siagni A",
  username: 'siagani',
  email: 'admin@cs157.com',
  password:'12345'},function (result) {
  console.log('user creation response ',result)
})
//call retrive user function
Users.getUsers(function (result) {
  console.log('users  ',result)
})
}, 500)
