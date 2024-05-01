// =============== Purpose ====================
// This route handles all admin user related operations such as user creation, listing, deleting etc
import { Router } from "express"; //import the express library
var AdminUserRoutes = Router() // define the route
import Users from '../logics/users.js' // import the user logic class to expose the user functions

//post api to create user account
AdminUserRoutes.get('/users/list', function (req, res) {
    //call the get users function defined in the users logis
    Users.getUsers(function (result) {
        res.json(result)
    })
})
//post api to add user to the database
AdminUserRoutes.post('/users/create', function (req, res) {
    //call this method in the users login to store the user data
    Users.createUser(req.body,function (result) {
        res.json(result)
    })
})
//update user data
AdminUserRoutes.get('/users/create', function (req, res) {
   
})

export default AdminUserRoutes;

