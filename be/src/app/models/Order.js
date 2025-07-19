const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Order = new Schema(
  {
    img: { type: String, require: true, default: 'img' },
    nameProduct: { type: String, require: true, default: 'Name Product' },
    typeProduct: { type: String, default: '' },
    branch: { type: String, default: '' },
    partNumber: { type: String, require: true, default: 'AA.AAAAA.000' },
    price: { type: String, require: true, default: '0' },
    numberProduct: { type: Number, default: 1 },
    status: { type: String, default: '' },
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
