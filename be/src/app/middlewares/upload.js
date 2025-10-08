const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'src/public/img';

    if (file.fieldname === 'avatar') {
      uploadPath = `${uploadPath}/avatar`;
    } else if (file.fieldname === 'image-product') {
      uploadPath = `${uploadPath}/product`;
    }

    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });
module.exports = upload;
