require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const produtrotes=require('./routes/Productroute');
const Authroutes=require('./routes/authroutes');
<<<<<<< HEAD
=======
const Orderroutes=require('./routes/orderroutes');
>>>>>>> bb3829661f1139a462ff9c34306973c4efa7be3c
const cp=require('cookie-parser');
const app=express();
app.use(express.json());
app.use(cp());  // to access cookieproperty
app.use('/api',produtrotes);
app.use('/api',Authroutes);
app.use('/api',Orderroutes)
app.listen(process.env.PORT,()=>{
    console.log(`server is listing in the port ${process.env.PORT}`);
});

mongoose.connect('mongodb://localhost:27017/Ecomerce').then(()=>{
    console.log("database is successfuuly connected");
}).catch((err)=>{
console.log("database is not connected",err.message);
})

