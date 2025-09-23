const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../app/middlewares/verifyToken');

const typeProductController = require('../app/controllers/TypeProductController');

router.get('', typeProductController.getTypeProducts);
router.post('/create', verifyToken, verifyAdmin, typeProductController.createTypeProduct);
router.delete('/delete-permanent', verifyToken, verifyAdmin, typeProductController.deletePermanentTypeProduct);

module.exports = router;
