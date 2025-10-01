const User = require('../models/User');

class UserController {
  // [GET] /users/:id
  getOneUser(req, res, next) {
    User.findOne({ _id: req.params.id })
      .then((user) => {
        if (user) {
          console.log('Get user with id:', req.params.id);
          res.status(200).json({ user });
        } else {
          res.status(404).json({ mgs: 'Không tìm thấy người dùng' });
        }
      })
      .catch(next);
  }

  // [GET] /users?id=...email=...&username=...&phone=...&banned=...
  getUsers(req, res, next) {
    const { id, email, username, phone, banned } = req.query;

    const filter = {
      ...(id && { _id: id }),
      ...(email && { email: { $regex: email, $options: 'i' } }),
      ...(username && { username: { $regex: username, $options: 'i' } }),
      ...(phone && { phone: { $regex: phone, $options: 'i' } }),
      ...(banned && { banned: banned }),
    };

    // log query
    console.log('--Find User query:', filter);

    User.find(filter)
      .lean()
      .then((users) => {
        if (users.length > 0) {
          res.status(200).json({ users });
        } else {
          res.status(404).json({ mgs: 'Không tìm thấy người dùng' });
        }
      })
      .catch(next);
  }

  // update user
  // [PATCH] /users/update?id=...
  updateUser(req, res, next) {
    User.updateOne({ _id: req.query.id }, req.body)
      .lean()
      .then(() => {
        console.log(`--Updated user with id: ${req.query.id}`);
        res.status(200).json({ message: 'Đã cập nhật thông tin người dùng' });
      })
      .catch(next);
  }

  // not event handling when not found _id in { delete: true } for all [DELETE]
  // delete temporary User
  // [DELETE] /users/delete-temporary-user?id=...
  deleteTemporaryUser(req, res, next) {
    User.delete({ _id: req.query.id })
      .then(() => {
        console.log(`--Deleted temporary User with id: ${req.query.id}`);
        res.status(200).json({ message: 'Đã khóa người dùng' });
      })
      .catch(next);
  }

  // delete permanent User
  // [DELETE] /users/delete-permanent-user?id...
  deletePermanentUser(req, res, next) {
    User.deleteOne({ _id: req.query.id })
      .then(() => {
        console.log(`--Deleted permanent User with id: ${req.query.id}`);
        res.status(200).json({ message: 'Đã xóa người dùng' });
      })
      .catch(next);
  }

  // restore user
  // [PATCH] /users/restore-user?id=...
  restoreUser(req, res, next) {
    User.restore({ _id: req.query.id })
      .then(() => {
        console.log(`--Restored User with id: ${req.query.id}`);
        res.status(200).json({ message: 'Đã mở khóa người dùng' });
      })
      .catch(next);
  }
}

module.exports = new UserController();
