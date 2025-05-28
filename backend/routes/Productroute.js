const express=require('express');
const { addProduct, getSingleProduct, getAllProduct, upDateProduct, deleteProduct } = require('../Controllers/Productcontroller');
const router=express.Router();

router.post('/product/new',addProduct);
router.get('/allproducts',getAllProduct);
router.get('/singleproduct/:id',getSingleProduct);
router.put('/updateproduct/:id',upDateProduct);
router.delete('/deleteProduct/:id',deleteProduct);

module.exports=router;