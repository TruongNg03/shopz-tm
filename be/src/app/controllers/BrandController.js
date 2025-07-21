const Brand = require('../models/Brand');

class BrandController {
  // get all brands
  // [GET] /brands
  getBrands(req, res, next) {
    Brand.find({})
      .lean()
      .then((brands) => {
        if (brands.length > 0) {
          res.status(200).json(brands);
        } else {
          res.status(200).json({ msg: 'Không tìm thấy tên các hãng sản phẩm' });
        }
      })
      .catch(next);
  }

  // create brand
  // [POST] /brands/create
  createBrand(req, res, next) {
    const createBrand = new Brand(req.body);

    Brand.findOne({ name: createBrand.name })
      .then((findBrand) => {
        if (findBrand) {
          res.status(400).json({ msg: 'Tên hãng này đã tồn tại, hãy đổi sang tên hãng khác' });
        } else {
          createBrand
            .save()
            .then(() => {
              console.log('--Created a brand');
              res.status(200).json({ msg: 'Đã thêm hãng sản phẩm' });
            })
            .catch(next);
        }
      })
      .catch(next);
  }

  // delete permanent brand
  // [DELETE] /brands/delete-permanent?name
  deletePermanentBrand(req, res, next) {
    Brand.deleteOne({ name: req.query.name })
      .then(() => {
        console.log(`--Deleted permanent brand with name: ${req.query.name}`);
        res.status(200).json({ msg: 'Đã xóa sản phẩm này' });
      })
      .catch(next);
  }
}

module.exports = new BrandController();
