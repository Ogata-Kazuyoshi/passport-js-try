const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const apiRoute = require('./controller/index.js');

const app = express();

app.use(cookieParser());
// ミドルウェアの設定
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'your-secret-key2',
    resave: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1', apiRoute);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = passport;
