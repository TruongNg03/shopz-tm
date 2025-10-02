const express = require('express');
const router = express.Router();

const orderController = require('../app/controllers/OrderController');

router.get('', orderController.getOrders);
router.patch('/update', orderController.updateOrder);
router.delete('/delete-permanent', orderController.deletePermanentOrder);

module.exports = router;
