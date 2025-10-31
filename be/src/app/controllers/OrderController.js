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
          { username: { $regex: search_input, $options: 'i' } },
          { email: { $regex: search_input, $options: 'i' } },
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

  // create order
  // [POST] /orders/create
  createOrder(req, res, next) {
    const createOrder = new Order(req.body);

    Order.findOne({ email: createOrder.email, partNumber: createOrder.partNumber })
      .then((order) => {
        if (order) {
          const newNumberProduct = order.numberProduct + 1;

          Order.findByIdAndUpdate(
            order._id,
            { numberProduct: newNumberProduct > 10 ? 10 : newNumberProduct },
            {
              new: true,
              runValidators: true,
            },
          )
            .lean()
            .then(() => {
              res.status(200).json({
                message: 'Đã thêm sản phẩm vào đơn hàng',
              });
            })
            .catch(next);
        } else {
          createOrder
            .save()
            .then((savedOrder) => {
              console.log('--Created a order');
              res.status(201).json({
                message: 'Đã thêm đơn hàng',
                order: savedOrder,
              });
            })
            .catch((err) => {
              console.error('Error creating order:', err);
              res.status(400).json({
                message: 'Lỗi khi thêm đơn hàng',
                error: err.message,
              });
            });
        }
      })
      .catch((err) => {
        console.error('Error finding order:', err);
        res.status(500).json({
          message: 'Lỗi khi tìm đơn hàng',
          error: err.message,
        });
      });
  }

  // update order
  // [PATCH] /orders/update?id=...
  updateOrder(req, res, next) {
    Order.findByIdAndUpdate(req.query.id, req.body, { new: true })
      .then((updatedOrder) => {
        if (!updatedOrder) {
          return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
        }
        console.log(`--Updated order with id: ${req.query.id}`);
        res.status(200).json({ message: 'Đã cập nhật đơn hàng', order: updatedOrder });
      })
      .catch(next);
  }

  // delete permanent order
  // [DELETE] /order/delete-permanent?id=...
  deletePermanentOrder(req, res, next) {
    if (!req.query.id) {
      return res.status(400).json({ message: 'Thiếu ID đơn hàng' });
    }

    Order.deleteOne({ _id: req.query.id })
      .then((result) => {
        console.log(result);

        if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'Không tìm thấy đơn hàng để xóa' });
        }

        console.log(`--Deleted permanent order with id: ${req.query.id}`);
        res.status(200).json({ message: 'Đã xóa đơn hàng này' });
      })
      .catch((error) => {
        console.error('Lỗi khi xóa đơn hàng:', error);
        next(error);
      });
  }

  // [DELETE] /orders/delete-permanent-orders
  deleteManyOrders(req, res, next) {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        message: 'Danh sách ID không hợp lệ',
      });
    }

    Order.deleteMany({ _id: { $in: ids } })
      .then((result) => {
        if (result.deletedCount > 0) {
          res.status(200).json({
            message: `Đã xóa ${result.deletedCount} đơn hàng`,
          });
        } else {
          res.status(404).json({
            message: 'Không tìm thấy đơn hàng để xóa',
          });
        }
      })
      .catch((err) => {
        console.error('Error deleting orders:', err);
        res.status(500).json({
          message: 'Lỗi khi xóa đơn hàng',
          error: err.message,
        });
      });
  }
}

module.exports = new OrderController();
