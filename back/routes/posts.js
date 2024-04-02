const exporess = require("express");

const router = exporess.Router();
const { Post, User, Image, Comment } = require("../models");

// GET /posts 게시글 가져오기
router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      // 원하는 부분의 데이터를 가져온다
      limit: 10,
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "DESC"],
      ],
      include: [
        { model: User, attributes: ["id", "nickname"] },
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
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;
