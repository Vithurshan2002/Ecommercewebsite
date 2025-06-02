const mongoose = require("mongoose");
var validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto=require('crypto');
const userScehma = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please Enter the name"],
  },
  email: {
    type: String,
    required: [true, "please Enter email"],
    unique: true, //to identify uniquly to set primary key
    validate: [validator.isEmail, "Enter the valid email"],
  },
  password: {
    type: String,
    required: [true, "please Enter the password"],
    maxLength: [6, "password cannot exceed 6 chacters"],
    select:false // oru userin datava query pani edukum pothu in tha password field madum varama seiram.because password is a most important..so passwordaum peravendumenn select(+password) enra chain method a use pani than edukanum
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordTokenExpire: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
//scemala data va save panana muthal seiyavendiya velai ..athku pre enta mehod use panuvam..athakul 2 parameter ..1st ethu nadakum pothu seiyanum..2nd etahi seiyanum enpathai functinaa eluthuvam
userScehma.pre("save", async function (next) {
 if(!this.isModified('password')) {
  next();
 }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//I create a funtion in the scema  for token generater AS A FUNTION OF THiS SCHEMA   //getJWTToken this is my funtion i create
userScehma.methods.getJWTToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {          // this . enpathu antha databasela iruthu endu artham inku
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
};

// is check password correct or wrong
userScehma.methods.isValidPassword=async function(enteredpassword){
  return  await bcrypt.compare(enteredpassword,this.password)
}


//getresettoken for reset pasword
userScehma.methods.getresetToken= function(){
  const token=crypto.randomBytes(20).toString('hex');//generate token

//kidacgatokena hash panni user kandupikathalavuuku decode panuram..and athai userscemala ulla resetPasswordToken la store pannuram
  this.resetPasswordToken=crypto.createHash('sha256').update(token).digest('hex');  // crptol createhash inul ennaencodeing usepannaporam endum.updatekulla hashpna vendiya original valuevum digetanthu antha stringa genertea panum method 

  //settoken expire time in the usermodela
  this.resetPasswordTokenExpire=Date.now()+ 30*60*1000;   //token generate ana time la irunthu 30 nimitham token expire time a kudukuram.. in milliseconds

  return token;

}


const userModel = mongoose.model("userscema", userScehma);
module.exports = userModel;
