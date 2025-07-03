require("dotenv").config();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
  const { cartItems, shippingAddress, userId, email, amount } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.product.name,
            images: [item.product.image?.[0] || ""],
          },
          unit_amount: item.product.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "https://male-fashion-alpha.vercel.app/payment-success",
      cancel_url: "https://male-fashion-alpha.vercel.app/payment-failed",
      metadata: {
        userId,
        email,
        amount,
        shippingAddressId: shippingAddress._id,
        items: JSON.stringify(
          cartItems.map((item) => ({
            productId: item.product._id,
            quantity: item.quantity,
          }))
        ),
      },
    });

    res.send({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};