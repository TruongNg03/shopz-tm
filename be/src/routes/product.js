const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');

router.get('/:id', productController.getOneProduct);
router.get('', productController.getProducts);
router.post('/create', productController.createProduct);
router.put('/edit', productController.editProduct);
router.delete('/delete-temporary', productController.deleteTemporaryProduct);
router.delete('/delete-permanent', productController.deletePermanentProduct);

module.exports = router;
