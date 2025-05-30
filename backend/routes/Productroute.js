const express=require('express');
const { addProduct, getSingleProduct, getAllProduct, upDateProduct, deleteProduct, getProductByName } = require('../Controllers/Productcontroller');
const { userAuthenticate, Authorizeroles } = require('../middlewares/UserAuthenticatemiddleware');
const router=express.Router();

router.post('/product/new',userAuthenticate,addProduct);
router.get('/allproducts',userAuthenticate,getAllProduct);  //two midlewares
router.get('/singleproduct/:id',getSingleProduct);
router.put('/updateproduct/:id',upDateProduct);
router.delete('/deleteProduct/:id',userAuthenticate,Authorizeroles('admin'),deleteProduct);  // user token kidachu ..then kudipida rolea poruthian madum deleteproduct milldwarea access panni prodecta alikalm
router.post('/findproduct',getProductByName);

module.exports=router;