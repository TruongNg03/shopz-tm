const express = require('express');
// const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// .env
require('@dotenvx/dotenvx').config({ quiet: true });

const app = express();
const port = 8888;

const db = require('./config/db/index');
const route = require('./routes');

//db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

app.use(cors());
app.use(cookieParser());

// http logger
// app.use(morgan('combined'));

// route init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
