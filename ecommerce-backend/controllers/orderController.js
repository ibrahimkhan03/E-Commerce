const Order = require('../models/orderModel');
const sendEmail = require('../utils/sendEmail');

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find().populate('user items.product shippingAddress');
  res.json(orders);
};


exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ user: userId }).populate("items.product");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};


exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });

  order.orderStatus = status;
  await order.save();

  await sendEmail({
    to: req.body.email,
    subject: 'Order Status Updated',
    text: `Your order status has been updated to ${status}.`,
  });

  res.json({ message: 'Order status updated', order });
};
