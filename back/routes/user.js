const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { Post, User, Comment, Image } = require("../models");
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
  console.log("로그인헤더--", req.headers);

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
            attributes: ["id", "nickname"],
          },
          {
            model: User,
            as: "Followings",
            attributes: ["id", "nickname"],
          },
        ],
      });

      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /user/followers ( 팔로워 리스트 가져오기 )
router.get("/followers", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
    });
    if (!user) {
      res.status(403).send("없는 사람을 찾으려고 하시네요!");
    }
    const followers = await user.getFollowers({
      limit: 3,
      attributes: {
        exclude: ["password"],
      },
    });
    console.log("팔로워리스트", followers);
    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /user/followings ( 팔로잉 리스트 가져오기 )
router.get("/followings", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: {
        exclude: ["password"],
      },
    });
    if (!user) {
      res.status(403).send("없는 사람을 찾으려고 하시네요!");
    }

    const followings = await user.getFollowings({
      limit: 3,
      attributes: {
        exclude: ["password"],
      },
    });
    console.log("팔로잉리스트", followings);

    res.status(200).json(followings);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET/user/1 ( 특정 유저 찾기 )
router.get("/:userId", async (req, res, next) => {
  try {
    const fullUserWithoutPassword = await User.findOne({
      where: { id: req.params.userId },
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: Post,
          attributes: ["id"],
        },
        {
          model: User,
          as: "Followings",
          attributes: ["id"],
        },
        {
          model: User,
          as: "Followers",
          attributes: ["id"],
        },
      ],
    });
    if (fullUserWithoutPassword) {
      const data = fullUserWithoutPassword.toJSON();
      data.Posts = data.Posts.length;
      data.Followings = data.Followings.length;
      data.Followers = data.Followers.length;
      res.status(200).json(data);
    } else {
      res.status(404).json("존재하지 않는 사용자입니다.");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /user/1/posts ( 특정 사용자의 게시글 찾기 )
router.get("/:userId/posts", async (req, res, next) => {
  try {
    const where = { UserId: req.params.userId };
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }

    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "DESC"],
      ],
      include: [
        {
          model: User, // 게시글 작성자
          attributes: ["id", "nickname"],
        },
        {
          model: User, // 좋아요 누른 사람
          as: "Likers",
          attributes: ["id"],
        },
        { model: Image },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
          ],
        },
        {
          model: Post,
          as: "Retweet",
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
            { model: Image },
          ],
        },
      ],
    });
    console.log("특정유저 포스트", posts);
    res.status(200).json(posts);
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
      return res.status(403).send("이미 사용중인 이메일입니다.");
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

// PATCH /user/nickname
router.patch("/nickname", isLoggedIn, async (req, res, next) => {
  try {
    await User.update(
      {
        nickname: req.body.nickname,
      },
      {
        where: { id: req.user.id },
      }
    );
    res.status(200).json({ nickname: req.body.nickname });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// PATCH /user/1/follow 팔로우
router.patch("/:userId/follow", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      res.status(403).send("존재하지 않는 유저입니다.");
    }
    await user.addFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /user/follower/2  팔로우 삭제하기
router.delete("/follower/:userId", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      res.status(403).send("존재하지 않는 유저입니다.");
    }
    await user.removeFollowing(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /user/1/follow 팔로우취소
router.delete("/:userId/follow", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      res.status(403).send("존재하지 않는 유저입니다.");
    }
    await user.removeFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
