const mongoose = require("mongoose");
var validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
  this.password = await bcrypt.hash(this.password, 10);
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

const userModel = mongoose.model("userscema", userScehma);
module.exports = userModel;
