const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { Post, Image, Comment, User } = require("../models");
const { isLoggedIn } = require("./middlewares");
const { error } = require("console");

const router = express.Router();
try {
  fs.accessSync("uploads");
} catch {
  console.log("uploads폴더가 없으므로 생성합니다");
  fs.mkdirSync("uploads");
}

// multi formData설정
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      // thdud.png
      const ext = path.extname(file.originalname); //확장자 추출 : .png
      const basename = path.basename(file.originalname, ext); // filename : 소영
      done(null, basename + "_" + new Date().getTime() + ext); // thdud124345123.png
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

// POST /images 이미지 추가
router.post("/images", isLoggedIn, upload.array("image"), (req, res, next) => {
  console.log(req.files);
  res.json(req.files.map((v) => v.filename));
});

// Post /post 포스트작성
router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
  // 로그인 후에는 passport가 deserializeUser를 실행해 req.user에 접근가능

  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });

    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        // 이미지 여러개 올리는 경우 [ thdud.png, thdud2.jpg ]
        // 실제 파일은 upload폴더에, db에는 파일에 접근할 수 있는 주소만 올린다.
        const images = await Promise.all(
          req.body.image.map((image) => Image.create({ src: image }))
        );
        await post.addImages(images);
      } else {
        // 이미지 한 개만 올리는 경우 thdud.png
        const images = await Image.create({ src: req.body.image });
        await post.addImages(images);
      }
    }

    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        { model: Image },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
              order: [["createdAt", "DESC"]],
            },
          ],
        },
        {
          model: User, // 게시글 작성자
          attributes: ["id", "nickname"],
        },
        {
          model: User, // 좋아요 누른 사람
          as: "Likers",
          attributes: ["id"],
        },
      ],
    });

    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Post /1/comment 댓글작성
router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
    });
    if (!post) {
      return res.status(403).send("존재하지 않는 게시글입니다");
    }

    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.params.postId,
      UserId: req.user.id,
    });
    const fullComment = await Comment.findOne({
      where: {
        id: comment.id,
      },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
      ],
    });

    // res.status(201).json(comment);
    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// PATCH /1/like 좋아요
router.patch("/:postId/like", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다");
    }
    // 관계형db table의 메서드사용
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /1/like 좋아요 취소
router.delete("/:postId/like", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다");
    }
    // 관계형db table의 메서드사용
    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /post 포스트삭제
router.delete("/:postId", isLoggedIn, async (req, res, next) => {
  try {
    await Post.destroy({
      where: { id: req.params.postId, UserId: req.user.id },
    });
    res.json({ postId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
