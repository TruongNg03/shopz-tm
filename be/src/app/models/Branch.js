const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Branch = new Schema(
  {
    branch: { type: String, require: true, default: 'Default Branch' },
  },
  {
    timestamps: true,
  },
);

Branch.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('Branch', Branch);
