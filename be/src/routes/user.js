const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../app/middlewares/verifyToken');

const userController = require('../app/controllers/UserController');

router.get('', verifyToken, verifyAdmin, userController.getUsers);
router.put('/update', userController.updateUser);
router.delete('/delete-temporary-user', verifyToken, verifyAdmin, userController.deleteTemporaryUser);
router.delete('/delete-permanent-user', verifyToken, verifyAdmin, userController.deletePermanentUser);
router.patch('/restore-user', verifyToken, verifyAdmin, userController.restoreUser);

module.exports = router;
