const Feedback = require('../models/Feedback');

class FeedbackController {
  // [GET] /feedbacks?email='...'&username='...'
  getFeedbacks(req, res, next) {
    const { email, username } = req.query;

    const filter = {
      ...(email && { email: { $regex: email, $options: 'i' } }),
      ...(username && { username: { $regex: username, $options: 'i' } }),
    };

    // log query
    console.log('--Find feedback query:', filter);

    Feedback.find(filter)
      .lean()
      .then((feedbacks) => {
        if (feedbacks.length > 0) {
          res.status(200).json({ feedbacks });
        } else {
          res.status(404).json({ mgs: 'Không tìm thấy phản hồi nào' });
        }
      })
      .catch(next);
  }
}

module.exports = new FeedbackController();
