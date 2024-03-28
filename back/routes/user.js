const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { User } = require("../models");
const router = express.Router();

// POST /user/login
router.post("/login", (req, res, next) => {

  // 미들웨어 확장해서 passport사용하기.
  passport.authenticate("local", (serverError, user, clientError) => {
    if (serverError) {
      console.error(serverError);
      return next(serverError);
    }
    if (clientError) {
      return res.status(401).send(clientError.reason);
    }

    // passport에서 로그인을 한번 더
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      return res.status(200).json(user);
    });
  })(req, res, next);
});

// POST /user/
router.post("/", async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 이메일입니다");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      password: hashedPassword,
      nickname: req.body.nickname,
    });

    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.status(200).send("signup OK");

  } catch (error) {
    console.error(error);
    next(error); //status(500)
  }
});

// POST /user/logout
router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("logout OK");
});

module.exports = router;
