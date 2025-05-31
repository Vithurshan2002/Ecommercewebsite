const Order = require("../models/Ordermodel");
const Product = require("../models/productmodel");
exports.newOrder = async (req, res, next) => {
  const {
    orderItems,
    shippingInfor,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  try {
    const data = await Order.create({
      orderItems,
      shippingInfor,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.userrr.id, // iget the id when authentiacte the user i assen the id in req.userr
    });
    res.status(200).json({ message: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//get single order
exports.getSingleOrder = async (req, res, next) => {
  try {
    const data = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!data) {
      return res.status(400).json({ message: "Order not found" });
    }
    res.status(200).json({ message: data });
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};

//get  all orders of loggedin user
exports.myOrders = async (req, res, next) => {
  try {
    const data = await Order.find({ user: req.userrr.id }); // user is the field of order schema
    if (!data) {
      return res.status(400).json({ message: "userorders are  not found" });
    }
    res.status(200).json({ message: data });
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};

//for admin

//get all orders of all user
exports.getAllorders = async (req, res, next) => {
  try {
    const data = await Order.find();
    if (!data) {
      return res.status(400).json({ message: "userorders are  not found" });
    }
    res.status(200).json({ message: data });
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};

//UpdateOrder(after buy the number of product ,then reduce the amount of quantity from full stoke)
exports.updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order.OrderStatus == "Deliverd") {
      return res.status(400).json("Order has been already deliverd");
    }
    //updating productstoke
    for (const orderItem of order.orderItems) {
      await updateStoke(orderItem.product, orderItem.quantity);
    }

    order.OrderStatus = req.body.orderstatus;
    order.deliveredAt = Date.now();
    await order.save({ validateBeforeSave: false });
    res.status(200).json({ message: "stokeupdated" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
// function that updating the product stock of each orderitem for abovereqesthandlermwthod
async function updateStoke(productid, quantity) {
  const product = await Product.findById(productid);
  try {
    if (!product) {
      console.log("Product not found");
      return;
    }

    product.stock = product.stock - quantity;
    await product.save({ validateBeforeSave: false });
  } catch (error) {
    console.log("errror", error.message);
  }
}

//deleteorder
exports.deleteOrder = async (req, res, next) => {
  try {
    const data = await Order.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(400).json({ message: "userorders are  not found" });
    }
    res.status(200).json({ message: data });
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};