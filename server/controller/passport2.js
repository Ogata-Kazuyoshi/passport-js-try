const router = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const users = [
  { id: 1, username: 'user1', password: '1234' },
  // 他のユーザー情報も同様に追加
];

// Passportの設定
//local-signup
passport.use(
  'local-signup',
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      // 新規登録時にはユーザーの存在チェックなどを行う
      const existingUser = users.find((u) => u.username === username);
      if (existingUser) {
        return done(null, false, { message: 'Username already exists.' });
      }

      // 新しいユーザーを作成
      const newUser = { id: users.length + 1, username, password };
      users.push(newUser);

      // 作成したユーザーを認証成功として返す
      return done(null, newUser);
    }
  )
);

//local-login
passport.use(
  'local-login',
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

router.post('/login', passport.authenticate('local-login'), (req, res) => {
  res.json({ message: 'Login successful' });
});

//Signin用のエンドポイント
router.post('/signup', passport.authenticate('local-signup'), (req, res) => {
  // 新規登録成功後の処理
  res.json({ message: 'Signup successful' });
});

// ログアウトエンドポイント
router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Logout successful' });
  });
  res;
});

// 認証されているかどうかを確認するエンドポイント
router.get('/checkAuth', (req, res) => {
  console.log('AuthCheck');
  if (req.isAuthenticated()) {
    console.log('accepted!! server');
    res.json({ authenticated: true, user: req.user.username });
  } else {
    console.log('rejected server!');
    res.json({ authenticated: false });
  }
});

module.exports = router;
