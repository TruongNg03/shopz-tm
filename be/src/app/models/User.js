const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const User = new Schema(
  {
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    username: { type: String, default: null },
    phone: { type: String, default: null },
    banned: { type: Boolean, default: false },
    // type ['user', 'admin']
    role: { type: String, default: 'user' },
  },
  {
    timestamps: true,
  },
);

User.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('User', User);
