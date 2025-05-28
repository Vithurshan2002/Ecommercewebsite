const express=require('express');
const { addProduct } = require('../Controllers/Productcontroller');
const router=express.Router();

router.get('/product',addProduct);


module.exports=router;