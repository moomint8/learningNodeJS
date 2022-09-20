const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);    // 세션에 user의 id만 저장
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
      .then(user => done(null, user))   // req.user, req.isAuthenticated() 로 유저 정보 접근
      .catch(err => done(err));
  });

  local();
  kakao();
};