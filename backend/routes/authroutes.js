const express=require('express');
const { registerUser, loginUser, logoutUser, forgetPassword } = require('../Controllers/authController');
const router=express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/logout',logoutUser)
router.post('/password/forgot',forgetPassword) 
module.exports=router;