const express=require('express');
const { addProduct, getSingleProduct, getAllProduct, upDateProduct, deleteProduct, getProductByName } = require('../Controllers/Productcontroller');
const router=express.Router();

router.post('/product/new',addProduct);
router.get('/allproducts',getAllProduct);
router.get('/singleproduct/:id',getSingleProduct);
router.put('/updateproduct/:id',upDateProduct);
router.delete('/deleteProduct/:id',deleteProduct);
router.post('/findproduct',getProductByName);

module.exports=router;