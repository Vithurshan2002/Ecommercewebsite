const express=require('express');
const { registerUser, loginUser, logoutUser, forgetPassword, resetpassword } = require('../Controllers/authController');
const router=express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/logout',logoutUser)
router.post('/password/forgot',forgetPassword) 
router.post('/password/reset/:token',resetpassword) 
module.exports=router;