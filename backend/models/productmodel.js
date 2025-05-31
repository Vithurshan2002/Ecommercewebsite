const mongoose = require("mongoose");

const productscehma = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter product name"],
    trim: true,
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    default: 1,
  },
  price: {
    type: Number,
    default: true,
  },
  description: {
    type: String,
    required: [true, "please enter project description"],
  },
  ratings: {
    type: String,
    default: 0,
  },
  images: [
    {
      image: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "please enter project category"],
    enum: {
      //ella catregoryyaum alow pannmal naam kudukm kcategories maddum add panna vaika enum use panuvam
      values: [
        "Electronics",
        "MobilePhones",
        "Laptops",
        "Accessories",
        "HeadPhones",
        "Food",
        "Books",
        "Clothes/Shoes",
        "Beauty/Health",
        "Sports",
        "Outdoor",
        "Home",
      ],
      message: "please enter the correct catecory",
    },
  },

  seller: {
    type: String,
    required: [true, "please enterthe product seller"],
    maxLength: [20, "product stock cannot exceed 20"],
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    // reviews kka niraya review varapothu so arraya kudkuram..athukulla object formatla data anupa poram so objectaa ethuram..antha  ovvoru objectukulla enena data irukumo athanudaya formataa kudukuram..athavathu araaykulla irukum ovoru reviewvum reviu elyutiayvar name, rating,antha kuripida revie irkum..
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const product = mongoose.model("product", productscehma);
module.exports = product;
