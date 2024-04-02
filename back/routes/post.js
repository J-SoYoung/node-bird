const express = require("express");
const { Post, Image, Comment, User } = require("../models");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

// Post /post 포스트작성
router.post("/", isLoggedIn, async (req, res, next) => {
  // 로그인 후에는 passport가 deserializeUser를 실행해 req.user에 접근가능

  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
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
router.patch("/:postId/like", async (req, res, next) => {
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
router.delete("/:postId/like", async (req, res, next) => {
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
router.delete("/", (req, res) => {
  res.json({ id: 1 });
});

module.exports = router;
