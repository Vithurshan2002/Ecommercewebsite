require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const produtrotes=require('./routes/Productroute');
const app=express();

app.use('/api',produtrotes);
app.listen(process.env.PORT,()=>{
    console.log(`server is listing in the port ${process.env.PORT}`);
});

mongoose.connect('mongodb://localhost:27017/Ecomerce').then(()=>{
    console.log("database is successfuuly connected");
}).catch((err)=>{
console.log("database is not connected",err.message);
})

