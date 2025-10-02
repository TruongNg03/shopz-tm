const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Product = new Schema(
  {
    img: { type: String, require: true, default: 'img' },
    linkTo: { type: String, require: true, default: '/default-product-link' },
    title: { type: String, default: 'Default title' },
    nameProduct: { type: String, require: true, default: 'Name Product' },
    numberProduct: { type: Number, default: 0 },
    typeProduct: { type: String, default: 'Default type product' },
    brand: { type: String, default: 'Default brand' },
    partNumber: { type: String, require: true, default: 'AA.AAAAA.000', unique: true },
    price: { type: String, default: '0' },
    status: { type: String, default: 'Có hàng' },
    shortOverview: { type: String, default: 'Default short overview' },
    overview: { type: String, default: 'Default overview' },
    shortDescription: { type: Array, default: ['Default short description'] },
    description: { type: Array, default: ['Default description'] },
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
