const TypeProduct = require('../models/TypeProduct');

class TypeProductController {
  // get all typeProducts
  // [GET] /typeProducts
  getTypeProducts(req, res, next) {
    TypeProduct.find({})
      .lean()
      .then((typeProducts) => {
        if (typeProducts.length > 0) {
          res.status(200).json(typeProducts);
        } else {
          res.status(404).json({ message: 'Không tìm thấy tên các loại sản phẩm' });
        }
      })
      .catch(next);
  }

  // create typeProduct
  // [PUT] /typeProducts/create
  createTypeProduct(req, res, next) {
    const createTypeProduct = new TypeProduct(req.body);

    TypeProduct.findOne({ name: createTypeProduct.name })
      .then((findTypeProduct) => {
        if (findTypeProduct) {
          res.status(409).json({ message: 'Lại sản phẩm này đã tồn tại, hãy đổi sang loại khác' });
        } else {
          createTypeProduct
            .save()
            .then(() => {
              console.log('--Created a type product');
              res.status(200).json({ message: 'Đã thêm loại sản phẩm' });
            })
            .catch(next);
        }
      })
      .catch(next);
  }

  // delete permanent TypeProduct
  // [DELETE] /TypeProducts/delete-permanent?name
  deletePermanentTypeProduct(req, res, next) {
    TypeProduct.deleteOne({ name: req.query.name })
      .then(() => {
        console.log(`--Deleted permanent type product with name: ${req.query.name}`);
        res.status(200).json({ message: 'Đã xóa loại phẩm này' });
      })
      .catch(next);
  }
}

module.exports = new TypeProductController();
