const TypeProduct = require('../models/Category');

class CategoryController {
  // get all categories
  // [GET] /categories
  getCategories(req, res, next) {
    TypeProduct.find({})
      .lean()
      .then((categories) => {
        if (categories.length > 0) {
          res.status(200).json({ categories, total: categories.length });
        } else {
          res.status(404).json({ message: 'Không tìm thấy tên các loại sản phẩm' });
        }
      })
      .catch(next);
  }

  // create category
  // [POST] /categories/create
  createCategory(req, res, next) {
    const createCategory = new Category(req.body);

    Category.findOne({ name: createCategory.name })
      .then((findCategory) => {
        if (findCategory) {
          res.status(409).json({ message: 'Lại sản phẩm này đã tồn tại, hãy đổi sang loại khác' });
        } else {
          createCategory
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

  // delete permanent Category
  // [DELETE] /Category/delete-permanent?name
  deletePermanentCategory(req, res, next) {
    Category.deleteOne({ name: req.query.name })
      .then(() => {
        console.log(`--Deleted permanent type product with name: ${req.query.name}`);
        res.status(200).json({ message: 'Đã xóa loại phẩm này' });
      })
      .catch(next);
  }
}

module.exports = new CategoryController();
