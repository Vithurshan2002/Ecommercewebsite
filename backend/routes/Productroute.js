const express=require('express');
<<<<<<< HEAD
const { addProduct, getSingleProduct, getAllProduct, upDateProduct, deleteProduct, getProductByName } = require('../Controllers/Productcontroller');
const { userAuthenticate } = require('../middlewares/UserAuthenticatemiddleware');
const router=express.Router();

router.post('/product/new',addProduct);
=======
const { addProduct, getSingleProduct, getAllProduct, upDateProduct, deleteProduct, getProductByName, createReview, getAllReview, deleteReview } = require('../Controllers/Productcontroller');
const { userAuthenticate, Authorizeroles } = require('../middlewares/UserAuthenticatemiddleware');
const router=express.Router();

router.post('/product/new',userAuthenticate,addProduct);
>>>>>>> bb3829661f1139a462ff9c34306973c4efa7be3c
router.get('/allproducts',userAuthenticate,getAllProduct);  //two midlewares
router.get('/singleproduct/:id',getSingleProduct);
router.put('/updateproduct/:id',upDateProduct);
router.post('/findproduct',getProductByName);
router.put('/review',userAuthenticate,createReview);
router.delete('/review',deleteReview);

router.get('/getreview',getAllReview);

//for admin
router.delete('/deleteProduct/:id',userAuthenticate,Authorizeroles('admin'),deleteProduct);  // user token kidachu ..then kudipida rolea poruthian madum deleteproduct milldwarea access panni prodecta alikalm
module.exports=router;