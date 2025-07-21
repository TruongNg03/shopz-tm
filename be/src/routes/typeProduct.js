const express = require('express');
const router = express.Router();

const typeProductController = require('../app/controllers/TypeProductController');

router.get('', typeProductController.getTypeProducts);
router.post('/create', typeProductController.createTypeProduct);
router.delete('/delete-permanent', typeProductController.deletePermanentTypeProduct);

module.exports = router;
