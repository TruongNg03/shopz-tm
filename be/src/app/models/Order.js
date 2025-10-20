const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Order = new Schema(
  {
    email: { type: String, require: true },
    username: { type: String, default: '' },
    img: { type: String, require: true, default: 'img' },
    nameProduct: { type: String, require: true, default: 'Name Product' },
    category: { type: String, default: 'Default type product' },
    branch: { type: String, default: 'Default Brand' },
    partNumber: { type: String, require: true, default: 'AA.AAAAA.000' },
    price: { type: String, require: true, default: '0' },
    numberProduct: { type: Number, default: 1 },
    totalPrice: { type: String, require: true, default: '0' },
    status: { type: String, default: 'processing' },
  },
  {
    timestamps: true,
  },
);

Order.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('Order', Order);
