const User = require('../models/User');
const bcrypt = require('bcrypt');

class UserController {
  // [GET] /users/:id
  getOneUser(req, res, next) {
    User.findOneWithDeleted({ _id: req.params.id })
      .then((user) => {
        if (user) {
          console.log('Get user with id:', req.params.id);
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }
      })
      .catch(next);
  }

  // [GET] /users?id=...email=...&username=...&phone=...&banned=...&search_input=...
  getUsers(req, res, next) {
    const { id, email, username, phone, banned, search_input, deleted } = req.query;

    let filter = {
      ...(id && { _id: id }),
      ...(email && { email: { $regex: email, $options: 'i' } }),
      ...(username && { username: { $regex: username, $options: 'i' } }),
      ...(phone && { phone: { $regex: phone, $options: 'i' } }),
      ...(banned && { banned: banned }),
      ...(deleted && { deleted: deleted }),
    };

    if (search_input) {
      filter = {
        ...filter,
        $or: [
          { email: { $regex: search_input, $options: 'i' } },
          { username: { $regex: search_input, $options: 'i' } },
          { phone: { $regex: search_input, $options: 'i' } },
        ],
      };
    }

    // log query
    console.log('--Find User query:', filter);

    User.findWithDeleted(filter)
      .lean()
      .then((users) => {
        if (users.length > 0) {
          res.status(200).json({ users, total: users.length });
        } else {
          res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }
      })
      .catch(next);
  }

  // update user
  // [PATCH] /users/update?id=...
  updateUser(req, res, next) {
    const { newPassword, currentPassword, ...updateData } = req.body;

    // User.updateOne({ _id: req.query.id }, req.body)
    //   .then(() => {
    //     console.log(`--Updated user with id: ${req.query.id}`);
    //     res.status(200).json({
    //       message: req.body.newPassword ? 'Đã thay đổi mật khẩu' : 'Đã cập nhật thông tin người dùng',
    //     });
    //   })
    //   .catch(next);

    User.findById({ _id: req.query.id })
      .then(async (user) => {
        if (!user) {
          return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }

        if (newPassword) {
          const isMatch = await bcrypt.compare(currentPassword, user.password);
          if (!isMatch) {
            return res.status(401).json({ message: 'Mật khẩu hiện tại không đúng' });
          }

          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(newPassword, salt);
        }

        Object.assign(user, updateData);
        user.save();

        console.log(
          `--user with id: ${req.query.id}`,
          req.body.newPassword ? 'Đã thay đổi mật khẩu' : 'Đã cập nhật thông tin người dùng',
        );

        res.status(200).json({
          message: req.body.newPassword ? 'Đã thay đổi mật khẩu' : 'Đã cập nhật thông tin người dùng',
        });
      })
      .catch(next);
  }

  // not event handling when not found _id in { delete: true } for all [DELETE]
  // delete temporary User
  // [DELETE] /users/delete-temporary-user?id=...
  deleteTemporaryUser(req, res, next) {
    User.delete({ _id: req.query.id })
      .then((result) => {
        if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }
        console.log(`--Deleted temporary User with id: ${req.query.id}`);
        return res.status(200).json({ message: 'Đã khóa người dùng' });
      })
      .catch(next);
  }

  // delete permanent User
  // [DELETE] /users/delete-permanent-user?id...
  deletePermanentUser(req, res, next) {
    User.deleteOne({ _id: req.query.id })
      .then((result) => {
        if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }
        console.log(`--Deleted permanent User with id: ${req.query.id}`);
        return res.status(204).send();
      })
      .catch(next);
  }

  // restore user
  // [PATCH] /users/restore-user?id=...
  restoreUser(req, res, next) {
    User.restore({ _id: req.query.id })
      .then(async (result) => {
        if (result.nModified === 0) {
          return res.status(404).json({ message: 'Người dùng không tồn tại hoặc chưa bị khóa' });
        }

        await User.updateOne({ _id: req.query.id }, { $set: { deleted: false } });

        console.log(`--Restored User with id: ${req.query.id}`);
        return res.status(200).json({ message: 'Đã mở khóa người dùng' });
      })
      .catch(next);
  }
}

module.exports = new UserController();
