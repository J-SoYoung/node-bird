const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");

const db = require("./models");
const passportCofig = require("./passport");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");

dotenv.config();
const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log("db연결성공");
  })
  .catch(console.error);

// login 설정
passportCofig();

// use 안에 들어가는 것들 => 미들웨어
app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);
// express 서버실행.
app.use(express.json());
// 프론트에서 받은 데이터를 req.body에 넣음
app.use(express.urlencoded({ extended: true }));
// session, cookie
app.use(cookieParser("nodebirdsecret"));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/post", postRouter);
app.use("/user", userRouter);

app.listen(3065, () => {
  console.log("서버 실행중@@@");
});
