const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

router.get('', userController.getUsers);
router.put('/update', userController.updateUser);
router.delete('/delete-temporary-user', userController.deleteTemporaryUser);
router.delete('/delete-permanent-user', userController.deletePermanentUser);
router.patch('/restore-user', userController.restoreUser);

module.exports = router;
