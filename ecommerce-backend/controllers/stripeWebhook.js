
require("dotenv").config();
const Stripe = require('stripe');
const Order = require('../models/orderModel');
const sendEmail = require('../utils/sendEmail');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const Cart = require("../models/cartModel")
const Product = require("../models/productModel");

exports.handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    console.log("Webhook signature verified");
  } catch (err) {
    console.error("Stripe Webhook signature verification failed", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { userId, email, amount, shippingAddressId } = session.metadata;

    let items = [];
    try {
      items = JSON.parse(session.metadata.items);
    } catch (e) {
      return res.status(400).json({ error: "Invalid item format" });
    }

    try {
      const order = new Order({
        user: userId,
        items: items.map(i => ({
          product: i.productId,
          quantity: i.quantity,
        })),
        amount: amount,
        shippingAddress: shippingAddressId,
        paymentStatus: 'paid',
        orderStatus: 'delivered',
      });

      await order.save();

      for (const item of items) {
        await Product.findByIdAndUpdate(
          item.productId,
          { $inc: { quantity: -item.quantity } },
          { new: true }
        );
      }
      await Cart.findOneAndUpdate({ userId }, { $set: { items: [] } });
      await sendEmail({
        to: email,
        subject: 'Order Confirmed',
        text: `Your order of ₹${amount} is confirmed.`,
      });

      return res.status(200).json({ received: true });
    } catch (error) {
      console.error("Order creation failed", error);
      return res.status(500).json({ error: "Failed to create order" });
    }
  } else {
    res.status(400).end();
  }
};
