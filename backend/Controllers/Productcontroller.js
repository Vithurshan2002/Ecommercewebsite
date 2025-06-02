const Product = require("../models/productmodel");
const APIFetures = require("../utils/apiFeatures");
//create product -http://localhost:3000/api/product/new
exports.addProduct = async (req, res, next) => {
  try {
    req.body.user = req.userrr.id; // req.bodyla vantha datvudan user enra enoru fielda add panni athakuvaluevaka antha producta add panityavarin idya kudka poram..yar producta addpninathu enpathum scemala add panana..and req.userrr.id ithil req,user enpathu nam ueserathencationjs fila json tookeneduthu decode ppani edutha idaya req,user enra variblea stora pni irutha m antha idya than kudukuram ..ave thane add pni irupar productai
    const data = await Product.create(req.body);
    res.status(200).json({ message: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get a single product-http://localhost:3000/api/singleproduct/:id
exports.getSingleProduct = async (req, res, next) => {
  try {
    const data = await Product.findById(req.params.id);
    res.status(200).json({ message: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all products -http://localhost:3000/api/allproducts
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

//update product -http://localhost:3000/api/updateproduct/:id
exports.upDateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(400).json({ message: "Product Not Found" });
    }
    const data = await Product.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete a product-http://localhost:3000/api/deleteProduct/:id
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

//search  products by name -http://localhost:3000/api/findproduct?keyword=oppo
exports.getProductByName = async (req, res, next) => {
  try {
    const resPerPage = 1;
    const apifeatures = new APIFetures(Product.find(), req.query)
      .search()
      .filter()
      .paginate(resPerPage);
    const data = await apifeatures.query;
    if (!data) {
      return res.status(400).json({ message: "Product Not Found" });
    }
    res.status(200).json({ message: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//create review -http://localhost:3000/api/review
exports.createReview = async (req, res, next) => {
  const { productId, rating, comment } = req.body;
  const review = {
    user: req.userrr.id,
    rating,
    comment,
  };
  try {
    const product = await Product.findById(productId);
    const isAlreadyReview = product.reviews.find((review) => {
      return review.user.toString() == req.userrr.id.toString();
    });
    //if the user is alreay review then we canot  add another review.but we can upadate
    if (isAlreadyReview) {
      product.reviews.forEach((review) => {
        if (review.user.toString() == req.userrr.id.toString()) {
          review.comment = comment;
          review.rating = rating;
        }
      });
    }
    //if user is not reviewd before,so we can review
    else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    //set the ratings field of the product scema by adding all the rating of specific product reviewratings
    product.ratings =
      product.reviews.reduce((acc, review) => {
        return review.rating + acc;
      }, 0) / product.reviews.length;

    //some times ratings ethuvume user kukadil average rating kanum pothu Nan ena varakoodum..so apidi vanthal nan ena databasela pathiya koodathu..0 ennapathiyanum ..so athukaka intha code
    product.ratings = isNaN(product.ratings) ? 0 : product.ratings;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//getthe reviews of specific product  http://localhost:3000/api/getreview?id={productid}
exports.getAllReview = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.id);
    if (!product) {
      return res.status(400).json({ message: "product not found" });
    }
    res.status(200).json({ message: product.reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete review http://localhost:3000/api/review?reviewid=683beceab06fd5e220bff05c&productid=68373c4666263664fa989425
exports.deleteReview = async (req, res, next) => {
  try {
   
    const product = await Product.findById(req.query.productid);
    //filter the review does not math the deleting review id
    const reviews = product.reviews.filter((review) => {
      return review._id.toString() !== req.query.reviewid.toString();
    });
     console.log(reviews);
    // current number of review
    const numOfReviews = reviews.length;
    ////find the currect averatge rating
    let ratings =
      reviews.reduce((acc, review) => {
        return review.rating + acc;
      }, 0) / reviews.length;
   const rating = isNaN(ratings) ? 0 : ratings;
    //update the product review
    await Product.findByIdAndUpdate(req.query.productid, {
      reviews,
      numOfReviews,
      rating,
    });
     res.status(200).json({ message: "updated succsss" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
