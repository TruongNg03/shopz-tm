const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../app/middlewares/verifyToken');

const productController = require('../app/controllers/ProductController');

router.get('', productController.getProducts);
router.post('/create', verifyToken, verifyAdmin, productController.createProduct);
router.put('/edit', verifyToken, verifyAdmin, productController.editProduct);
router.delete('/delete-temporary', verifyToken, verifyAdmin, productController.deleteTemporaryProduct);
router.delete('/delete-permanent', verifyToken, verifyAdmin, productController.deletePermanentProduct);

module.exports = router;
