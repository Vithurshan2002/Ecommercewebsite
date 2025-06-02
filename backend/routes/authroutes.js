const express=require('express');
const { userAuthenticate,Authorizeroles } = require('../middlewares/UserAuthenticatemiddleware');
const { registerUser, loginUser, logoutUser, forgetPassword, resetpassword, getUserProfile, changePassword, updateProfile, getAllUser, getSpecificUser, upDateUser, deleteuser } = require('../Controllers/authController');
const router=express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/logout',logoutUser)
router.post('/password/forgot',forgetPassword) 
router.post('/password/reset/:token',resetpassword)
router.get('/getuserdetail',userAuthenticate,getUserProfile)    // userAuthenticate run ana pine aduth amiddleware run akum
router.put('/changepassword',userAuthenticate,changePassword)  
router.put('/updateprofile',userAuthenticate,updateProfile)  

// for admin
router.get('/admin/getalluserdetails',userAuthenticate,Authorizeroles('admin'),getAllUser);
router.get('/admin/getuserprofile/:id',userAuthenticate,Authorizeroles('admin'),getSpecificUser);
router.put('/admin/updateuserprofile/:id',userAuthenticate,Authorizeroles('admin'),upDateUser);
router.delete('/admin/deleteuserProfile/:id',userAuthenticate,Authorizeroles('admin'),deleteuser);

module.exports=router;