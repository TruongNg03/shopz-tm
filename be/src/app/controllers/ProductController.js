const Product = require('../models/Product');

class ProductController {
  // [GET] /products?id=...category='...'&brand='...'&name_product=...
  getProducts(req, res, next) {
    const { id, category, brand, name_product, search_input } = req.query;

    let filter = {
      ...(id && { _id: id }),
      ...(category && { category: { $regex: category, $options: 'i' } }),
      ...(brand && { brand: { $regex: brand, $options: 'i' } }),
      ...(name_product && { nameProduct: { $regex: name_product, $options: 'i' } }),
    };

    if (search_input) {
      filter = {
        ...filter,
        $or: [
          { nameProduct: { $regex: search_input, $options: 'i' } },
          { brand: { $regex: search_input, $options: 'i' } },
        ],
      };
    }

    // log query
    console.log('--Find product query:', filter);

    Product.find(filter)
      .lean()
      .then((products) => {
        if (products.length > 0) {
          res.status(200).json({ products, total: products.length });
        } else {
          res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }
      })
      .catch(next);
  }

  // create product
  // [POST] /products/create
  createProduct(req, res, next) {
    if (req.file) {
      req.body.img = `img/product/${req.file.filename}`;
    }

    const createProduct = new Product(req.body);

    Product.findOne({ partNumber: createProduct.partNumber })
      .then((findProduct) => {
        if (findProduct) {
          res.status(409).json({ message: 'Mã hàng đã tồn tại' });
        } else {
          createProduct
            .save()
            .then(() => {
              console.log('--Created a product');
              res.status(201).json({ message: 'Đã thêm sản phẩm' });
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
          res.status(409).json({ message: 'Mã hàng đã tồn tại, hãy đổi sang mã hàng khác' });
        } else {
          Product.updateOne({ _id: req.query.id }, req.body)
            .lean()
            .then((result) => {
              if (result.matchedCount === 0) {
                return res.status(404).json({ message: 'Không tìm thấy sản phẩm để chỉnh sửa' });
              }

              console.log(`--Edited product with id: ${req.query.id}`);
              res.status(200).json({ message: 'Đã chỉnh sửa sản phẩm' });
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
        res.status(200).json({ message: 'Đã xóa tạm thời sản phẩm' });
      })
      .catch(next);
  }

  // delete permanent product
  // [DELETE] /products/delete-permanent?id
  deletePermanentProduct(req, res, next) {
    Product.deleteOne({ _id: req.query.id })
      .then(() => {
        console.log(`--Deleted permanent product with id: ${req.query.id}`);
        res.status(200).json({ message: 'Đã xóa sản phẩm' });
      })
      .catch(next);
  }
}

module.exports = new ProductController();
