const express = require('express');
const router = express.Router();

const brandController = require('../app/controllers/BrandController');

router.get('', brandController.getBrands);
router.post('/create', brandController.createBrand);
router.delete('/delete-permanent', brandController.deletePermanentBrand);

module.exports = router;
