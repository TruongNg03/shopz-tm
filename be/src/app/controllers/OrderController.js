const Order = require('../models/Order');

class OrderController {
  // get all orders
  // [GET] /orders?search_input=...
  getOrders(req, res, next) {
    const { nameProduct, email, username, search_input } = req.query;

    let filter = {
      ...(nameProduct && { nameProduct: { $regex: nameProduct, $options: 'i' } }),
      ...(email && { email: { $regex: email, $options: 'i' } }),
      ...(username && { username: { $regex: username, $options: 'i' } }),
    };

    if (search_input) {
      filter = {
        ...filter,
        $or: [
          { nameProduct: { $regex: search_input, $options: 'i' } },
          //   { username: { $regex: search_input, $options: 'i' } },
          //   { email: { $regex: search_input, $options: 'i' } },
        ],
      };
    }

    // log query
    console.log('--Find feedback query:', filter);

    Order.find(filter)
      .lean()
      .then((orders) => {
        if (orders.length > 0) {
          res.status(200).json({ orders, total: orders.length });
        } else {
          res.status(404).json({ message: 'Không tìm thấy đơn hàng nào' });
        }
      })
      .catch(next);
  }

  // update order
  // [PATCH] /orders/update?id=...
  updateOrder(req, res, next) {
    Order.updateOne({ _id: req.query.id }, req.body)
      .lean()
      .then(() => {
        console.log(`--Updated order with id: ${req.query.id}`);
        res.status(200).json({ message: 'Đã cập nhật đơn hàng' });
      })
      .catch(next);
  }

  // delete permanent order
  // [DELETE] /Order/delete-permanent?id=...
  deletePermanentOrder(req, res, next) {
    Order.deleteOne({ _id: req.query.id })
      .then(() => {
        console.log(`--Deleted permanent order with id: ${req.query.id}`);
        res.status(200).json({ message: 'Đã xóa đơn hàng này' });
      })
      .catch(next);
  }
}

module.exports = new OrderController();
