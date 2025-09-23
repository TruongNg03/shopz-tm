const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../app/middlewares/verifyToken');

const brandController = require('../app/controllers/BrandController');

router.get('', brandController.getBrands);
router.post('/create', verifyToken, verifyAdmin, brandController.createBrand);
router.delete('/delete-permanent', verifyToken, verifyAdmin, brandController.deletePermanentBrand);

module.exports = router;
