const express=require('express');
const { newOrder, getSingleOrder, myOrders, getAllorders, updateOrder, deleteOrder } = require('../Controllers/Ordercontroller');
const { userAuthenticate ,Authorizeroles} = require('../middlewares/UserAuthenticatemiddleware');
const router=express.Router();

router.post('/order/neworder',userAuthenticate,newOrder);
router.get('/order/getsingleorder/:id',userAuthenticate,getSingleOrder);
router.get('/order/myOrders/:id',userAuthenticate,myOrders);
//for admin
router.get('/order/allorders',userAuthenticate,Authorizeroles('admin'),getAllorders);
router.put('/order/updatestoke/:id',userAuthenticate,Authorizeroles('admin'),updateOrder);
router.delete('/order/deleteorder/:id',userAuthenticate,Authorizeroles('admin'),deleteOrder);
module.exports=router;