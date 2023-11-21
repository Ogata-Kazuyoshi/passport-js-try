const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const apiRoute = require('./controller/index.js');

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

// ユーザーデータの仮置き場（本番環境ではデータベースを使用することが推奨されます）
const users = [
  { id: 1, username: 'user2', password: 'password2' },
  // 他のユーザー情報も同様に追加
];

// Passportの設定
passport.use(
  new LocalStrategy((username, password, done) => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect username or password.' });
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find((u) => u.id === id);
  done(null, user);
});

// ログインエンドポイント;
app.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Login successful' });
});

// ログアウトエンドポイント
app.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Logout successful' });
  });
  res;
});

// 認証されているかどうかを確認するエンドポイント
app.get('/checkAuth', (req, res) => {
  console.log('AuthCheck');
  if (req.isAuthenticated()) {
    console.log('accepted!! server');
    res.json({ authenticated: true, user: req.user });
  } else {
    console.log('rejected server!');
    res.json({ authenticated: false });
  }
});
// app.use('/api/v1', apiRoute);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { passport };
