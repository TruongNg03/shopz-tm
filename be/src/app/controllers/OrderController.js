const Order = require('../models/Order');
const User = require('../models/User');

class OrderController {
  // get all orders
  // [GET] /orders?search_input=...
  getOrders(req, res, next) {
    const { nameProduct, email, username, partNumber, search_input } = req.query;

    let filter = {
      ...(nameProduct && { nameProduct: { $regex: nameProduct, $options: 'i' } }),
      ...(email && { email: { $regex: email, $options: 'i' } }),
      ...(username && { username: { $regex: username, $options: 'i' } }),
      ...(partNumber && { partNumber: { $regex: partNumber, $options: 'i' } }),
    };

    if (search_input) {
      filter = {
        ...filter,
        $or: [
          { nameProduct: { $regex: search_input, $options: 'i' } },
          { partNumber: { $regex: search_input, $options: 'i' } },
          { username: { $regex: search_input, $options: 'i' } },
          { email: { $regex: search_input, $options: 'i' } },
        ],
      };
    }

    // log query
    console.log('--Find order query:', filter);

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
  async createOrder(req, res, next) {
    try {
      const createOrder = new Order(req.body);

      const existingOrder = await Order.findOne({
        email: createOrder.email,
        partNumber: createOrder.partNumber,
      });

      if (existingOrder) {
        const newNumberProduct = Math.min(existingOrder.numberProduct + 1, 10);
        await Order.findByIdAndUpdate(existingOrder._id, {
          numberProduct: newNumberProduct,
        });

        return res.status(200).json({ message: 'Đã thêm sản phẩm vào đơn hàng' });
      }

      const savedOrder = await createOrder.save();
      console.log('--Created an order');

      await User.findOneAndUpdate({ email: savedOrder.email }, { $inc: { numberOrder: 1 } }, { new: true });

      return res.status(201).json({
        message: 'Đã thêm đơn hàng',
        order: savedOrder,
      });
    } catch (err) {
      console.error('Error creating order:', err);
      next(err);
    }
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
  async deletePermanentOrder(req, res, next) {
    try {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ message: 'Thiếu ID đơn hàng' });
      }

      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({ message: 'Không tìm thấy đơn hàng để xóa' });
      }

      const result = await Order.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Không tìm thấy đơn hàng để xóa' });
      }

      await User.findOneAndUpdate({ email: order.email }, { $inc: { numberOrder: -1 } }, { new: true });

      console.log(`--Deleted permanent order with id: ${id}`);
      res.status(200).json({
        message: `Đã xóa đơn hàng và cập nhật số lượng đơn hàng của: ${order.email}`,
      });
    } catch (err) {
      console.error('Lỗi khi xóa đơn hàng:', err);
      next(err);
    }
  }

  // [DELETE] /orders/delete-permanent-orders
  async deleteManyOrders(req, res, next) {
    try {
      const { ids, email } = req.body;

      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: 'Danh sách ID không hợp lệ' });
      }

      const result = await Order.deleteMany({ _id: { $in: ids } });

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Không tìm thấy đơn hàng để xóa' });
      }

      if (email) {
        await User.findOneAndUpdate({ email }, { numberOrder: 0 }, { new: true });
      }

      console.log(`--Deleted ${result.deletedCount} orders for ${email || 'unknown user'}`);
      res.status(200).json({
        message: `Đã xóa ${result.deletedCount} đơn hàng và đặt lại số đơn hàng về 0`,
      });
    } catch (err) {
      console.error('Error deleting orders:', err);
      next(err);
    }
  }
}

module.exports = new OrderController();
