const Product = require("../models/productmodel");
const APIFetures=require('../utils/apiFeatures');
//create product
exports.addProduct = async (req, res, next) => {
  try {
    const data = await Product.create(req.body);
    res.status(200).json({ message: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get a single product
exports.getSingleProduct = async (req, res, next) => {
  try {
    const data = await Product.findById(req.params.id);
    res.status(200).json({ message: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all products
exports.getAllProduct = async (req, res, next) => {
  try {
    const data = await Product.find();
    if (!data) {
      return res.status(400).json({ message: "Product Not Found" });
    }
    res.status(200).json({ message: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//update product
exports.upDateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(400).json({ message: "Product Not Found" });
    }
    const data = await Product.findByIdAndUpdate(req.params.id,req.body);
    res.status(200).json({ message: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete a product
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(400).json({ message: "Product Not Found" });
    }
    const data = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//search  products by name
exports.getProductByName = async (req, res, next) => {
  try {
   const  resPerPage=1;
   const apifeatures= new APIFetures(Product.find(),req.query).search().filter().paginate(resPerPage);
    const data = await apifeatures.query;
    if (!data) {
      return res.status(400).json({ message: "Product Not Found" });
    }
    res.status(200).json({ message: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};