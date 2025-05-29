const User = require("../models/Usermodel");

exports.registerUser = async (req, res, next) => {
  try {
    const{name,email,password,avatar}=req.body;
    const data = await User.create({
        name,
        email,
        password,
        avatar
    });
    res.status(200).json({message:data})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};
