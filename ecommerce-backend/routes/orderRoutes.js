const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  getUserOrders,

} = require('../controllers/orderController');

router.get('/all', getAllOrders);
router.get('/user/:userId', getUserOrders);


module.exports = router;