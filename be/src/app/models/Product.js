const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Product = new Schema(
  {
    img: { type: String, require: true, default: 'img' },
    linkTo: { type: String, require: true, default: '/def-product' },
    title: { type: String, default: '' },
    nameProduct: { type: String, require: true, default: 'Name Product' },
    typeProduct: { type: String, default: '' },
    branch: { type: String, default: '' },
    partNumber: { type: String, require: true, default: 'AA.AAAAA.000' },
    price: { type: String, default: '0' },
    status: { type: String, default: 'Có hàng' },
    shortOverview: { type: String, default: '' },
    overview: { type: String, default: '' },
    shortDescription: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  {
    timestamps: true,
  },
);

Product.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('Product', Product);
