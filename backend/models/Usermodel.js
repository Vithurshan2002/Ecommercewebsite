const mongoose = require("mongoose");
var validator = require("validator");
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

const userModel = mongoose.model("userscema", userScehma);
module.exports = userModel;
