const mongoose = require("mongoose");

const orderschema = new mongoose.Schema({
  shippingInfor: {
    address: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "userscema",
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      product: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "products",
      },
    },
  ],

  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  paidAt: {
    type: Date,
  },
  deliveredAt: {
    type: Date,
  },
  OrderStatus: {
    type: String,
    required: true,
     default:'processing',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const OrderModel=mongoose.model('order',orderschema);

module.exports=OrderModel;