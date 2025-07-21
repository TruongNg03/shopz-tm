const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const TypeProduct = new Schema(
  {
    name: { type: String, require: true, default: 'Default Type Product' },
  },
  {
    timestamps: true,
  },
);

TypeProduct.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('TypeProduct', TypeProduct);
