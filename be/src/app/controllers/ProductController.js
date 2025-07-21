const Product = require('../models/Product');

class ProductController {
  // [GET] /products?id=...type='...'&brand='...'
  getProducts(req, res, next) {
    const { id, type, brand } = req.query;

    const filter = {
      ...(id && { _id: id }),
      ...(type && { typeProduct: type }),
      ...(brand && { brand: brand }),
    };

    // log query
    console.log('--Find product query:', filter);

    Product.find(filter)
      .lean()
      .then((products) => {
        if (products.length > 0) {
          res.status(200).json({ products });
        } else {
          res.status(200).json({ mgs: 'Không tìm thấy sản phẩm' });
        }
      })
      .catch(next);
  }

  // create product
  // [POST] /products/create
  createProduct(req, res, next) {
    const createProduct = new Product(req.body);

    Product.findOne({ partNumber: createProduct.partNumber })
      .then((findProduct) => {
        if (findProduct) {
          res.status(400).json({ msg: 'Mã hàng đã tồn tại' });
        } else {
          createProduct
            .save()
            .then(() => {
              console.log('--Created a product');
              res.status(200).json({ msg: 'Đã thêm sản phẩm' });
            })
            .catch(next);
        }
      })
      .catch(next);
  }

  // edit product
  // [PUT] /products/edit?id
  editProduct(req, res, next) {
    Product.findOne({ partNumber: req.body.partNumber })
      .then((findProduct) => {
        if (findProduct) {
          res.status(400).json({ msg: 'Mã hàng đã tồn tại, hãy đổi sang mã hàng khác' });
        } else {
          Product.updateOne({ _id: req.query.id }, req.body)
            .lean()
            .then(() => {
              console.log(`--Edited product with id: ${req.query.id}`);
              res.status(200).json({ msg: 'Đã chỉnh sửa sản phẩm' });
            })
            .catch(next);
        }
      })
      .catch(next);
  }

  // not event handling when not found _id in { delete: true } for all [DELETE]
  // delete temporary product
  // [DELETE] /products/delete-temporary?id
  deleteTemporaryProduct(req, res, next) {
    Product.delete({ _id: req.query.id })
      .then(() => {
        console.log(`--Deleted temporary product with id: ${req.query.id}`);
        res.status(200).json({ msg: 'Đã xóa tạm thời sản phẩm' });
      })
      .catch(next);
  }

  // delete permanent product
  // [DELETE] /products/delete-permanent?id
  deletePermanentProduct(req, res, next) {
    Product.deleteOne({ _id: req.query.id })
      .then(() => {
        console.log(`--Deleted permanent product with id: ${req.query.id}`);
        res.status(200).json({ msg: 'Đã xóa sản phẩm' });
      })
      .catch(next);
  }
}

module.exports = new ProductController();
