// =============== Purpose ====================
// This route handles product-related operations
import { Router } from "express";
var productRoutes=Router()


//define the routes
productRoutes.get('/add-product',function(req,res){[
    //you do your operations here
    res.render('products',{})
]})
//add an api to add products
productRoutes.post('/add-product',function(req,res){[
    //you do your operations here
    res.json({message:'we have posted the data'})
]})
//
productRoutes.get('/post',function(req,res){[
    //you do your operations here
    res.render('post',{})
]})

export default productRoutes;