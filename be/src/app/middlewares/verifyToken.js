const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function verifyToken(req, res, next) {
  try {
    let token = null;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.access_token) {
      token = req.cookies.access_token;
    }

    if (!token) {
      return res.status(401).json({ message: 'Chưa đăng nhập hoặc token hết hạn!' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Check user trong DB
    const user = await User.findOneWithDeleted({ _id: decoded._id });
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }

    // Nếu là user thường và bị khóa thì logout
    if (user.role !== 'admin' && user.deleted === true) {
      return res.status(403).json({ message: 'Tài khoản đã bị khóa, vui lòng liên hệ với admin!' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(403).json({ message: 'Token không hợp lệ hoặc đã hết hạn!' });
  }
}

function verifyAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: 'Chưa đăng nhập hoặc token hết hạn!' });
  }

  if (req.user.role?.toLowerCase() !== 'admin') {
    return res.status(403).json({ message: 'Bạn không có quyền thực hiện thao tác này!' });
  }

  next();
}

module.exports = { verifyToken, verifyAdmin };
