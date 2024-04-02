const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { Post, User } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

// POST /user/login
router.post("/login", isNotLoggedIn, (req, res, next) => {
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
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        //User 테이블에서 비밀번호 제외하고 정보를 받겠다.
        attributes: {
          exclude: ["password"],
        },
        // sequalize가 다른 테이블과의 관계를 자동으로 저장해줌
        // hanMany로 저장했기 때문에 me.posts가됨
        include: [
          {
            model: Post, // 내가 쓴 게시글
            attributes: ["id"],
          },
          {
            model: User, // follower
            as: "Followers",
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followings",
            attributes: ["id"],
          },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

// GET /user
router.get("/", async (req, res, next) => {
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Post, // 내가 쓴 게시글
            attributes: ["id"],
          },
          {
            model: User, // follower
            as: "Followers",
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followings",
            attributes: ["id"],
          },
        ],
      });

      res.status(200).json(fullUserWithoutPassword);
    }
    res.status(200).json(null);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /user/ (회원가입)
router.post("/", isNotLoggedIn, async (req, res, next) => {
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
router.post("/logout", isLoggedIn, (req, res) => {
  req.logout(() => {
    req.session.destroy();
    res.send("logout OK");
  });
  // res.send("logout OK");
});

module.exports = router;
