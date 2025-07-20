const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class SignInController {
  // register
  // [POST] /auth/register
  register(req, res, next) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    // check email
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          return res.status(400).json({ message: 'Tài khoản đã tồn tại!' });
        }
      })
      .catch(next);

    User.findOneWithDeleted({ deleted: true, email: req.body.email })
      .then((user) => {
        if (user) {
          return res.status(400).json({ message: 'Tài khoản đã bị khóa!' });
        }
      })
      .catch(next);

    // create new account
    newUser
      .save()
      .then((user) => res.status(200).json(`${user.email} has been created!`))
      .catch(next);
  }

  // login
  // [POST] /auth/login
  login(req, res, next) {
    const currUserLogin = req.body;

    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          // check in deleted account
          User.findDeleted({ deleted: true, email: currUserLogin.email })
            .then((deletedUser) => {
              if (deletedUser.length) {
                return res.status(400).json({ message: 'Tài khoản đã bị khóa!' });
              } else {
                return res.status(400).json({ message: 'Tài khoản không tồn tại!' });
              }
            })
            .catch(next);
        } else {
          bcrypt
            .compare(currUserLogin.password, user.password)
            .then((result) => {
              if (!result) {
                return res.status(400).json({ message: 'Tài khoản hoặc mật khẩu sai!' });
              }

              // show email when login
              console.log('-- ' + user.email + ' login');

              // generate token
              const token = jwt.sign({ _id: user._id, user: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

              res
                .cookie('access_token', token, {
                  httpOnly: true,
                })
                .status(200)
                .json({ email: user.email, role: user.role, token: token });
            })
            .catch(next);
        }
      })
      .catch(next);
  }
}

module.exports = new SignInController();
