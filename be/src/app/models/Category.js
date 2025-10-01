const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Category = new Schema(
  {
    name: { type: String, require: true, default: 'Default Category' },
    key: { type: String, require: true, default: 'category' },
  },
  {
    timestamps: true,
  },
);

Category.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('Category', Category);
