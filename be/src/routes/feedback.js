const express = require('express');
const router = express.Router();

const FeedbackController = require('../app/controllers/FeedbackController');

router.get('', FeedbackController.getFeedbacks);

module.exports = router;
