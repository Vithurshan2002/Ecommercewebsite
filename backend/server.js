require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const app=express();
app.use('/',(req,res,next)=>{
    
});
app.listen(process.env.PORT,()=>{
    console.log(`server is listing in the port ${process.env.PORT}`);
});


