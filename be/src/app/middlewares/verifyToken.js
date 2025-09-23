const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  try {
    let token = null;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.access_token) {
      token = req.cookies.access_token;
    }

    if (!token) {
      return res.status(401).json({ message: 'Chưa đăng nhập!' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token không hợp lệ hoặc đã hết hạn!' });
  }
}

function verifyAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: 'Chưa đăng nhập!' });
  }

  if (req.user.role?.toLowerCase() !== 'admin') {
    return res.status(403).json({ message: 'Bạn không có quyền thực hiện thao tác này!' });
  }

  next();
}

module.exports = { verifyToken, verifyAdmin };
