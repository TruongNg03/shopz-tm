const Feedback = require('../models/Feedback');

class FeedbackController {
  // [GET] /feedbacks?email='...'&username='...'&search_input=...
  getFeedbacks(req, res, next) {
    const { email, username, search_input } = req.query;

    let filter = {
      ...(email && { email: { $regex: email, $options: 'i' } }),
      ...(username && { username: { $regex: username, $options: 'i' } }),
    };

    if (search_input) {
      filter = {
        ...filter,
        $or: [
          { email: { $regex: search_input, $options: 'i' } },
          { username: { $regex: search_input, $options: 'i' } },
        ],
      };
    }

    // log query
    console.log('--Find feedback query:', filter);

    Feedback.find(filter)
      .lean()
      .then((feedbacks) => {
        if (feedbacks.length > 0) {
          res.status(200).json({ feedbacks, total: feedbacks.length });
        } else {
          res.status(404).json({ message: 'Không tìm thấy phản hồi nào' });
        }
      })
      .catch(next);
  }
}

module.exports = new FeedbackController();
