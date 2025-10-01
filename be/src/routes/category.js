const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../app/middlewares/verifyToken');

const categoryController = require('../app/controllers/CategoryController');

router.get('', categoryController.getCategories);
router.post('/create', verifyToken, verifyAdmin, categoryController.createCategory);
router.delete('/delete-permanent', verifyToken, verifyAdmin, categoryController.deletePermanentCategory);

module.exports = router;
