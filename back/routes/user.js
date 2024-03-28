const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const router = express.Router();

router.post("/", async (req, res, next) => {
  // POST /user/
  console.log("signup서버요청중");
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

module.exports = router;
