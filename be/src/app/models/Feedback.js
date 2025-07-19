const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Feedback = new Schema(
  {
    email: { type: String, require: true, unique: true },
    username: { type: String, default: null },
    feedback: { type: String, default: null },
  },
  {
    timestamps: true,
  },
);

Feedback.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('Feedback', Feedback);
