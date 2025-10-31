const express = require('express');
const router = express.Router();
const { verifyToken } = require('../app/middlewares/verifyToken');

const orderController = require('../app/controllers/OrderController');

router.get('', orderController.getOrders);
router.post('/create', verifyToken, orderController.createOrder);
router.patch('/update', verifyToken, orderController.updateOrder);
router.delete('/delete-permanent', verifyToken, orderController.deletePermanentOrder);
router.delete('/delete-permanent-orders', verifyToken, orderController.deleteManyOrders);

module.exports = router;
