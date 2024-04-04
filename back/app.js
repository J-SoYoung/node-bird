const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");

const db = require("./models");
const passportCofig = require("./passport");
const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
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

// log기록 라이브러리
app.use(morgan("dev"));

// use 안에 들어가는 것들 => 미들웨어
app.use(
  cors({
    origin: "http://localhost:3000", // CORS 도메인허용 Access-Control-Allow-Origin
    credentials: true, // 쿠키허용 Access-Control-Allow-credentials
  })
);

// express 서버실행. 일반 axios호출
app.use(express.json());

// front에서도 서버의 폴더 접근할 수 있도록 설정 ( image 미리보기 때문 )
app.use("/", express.static(path.join(__dirname, "uploads")));

// 프론트에서 받은 데이터를 req.body에 넣음, 일반 form데이터 받을 때
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

// router
app.use("/post", postRouter);
app.use("/posts", postsRouter);
app.use("/user", userRouter);

app.listen(3065, () => {
  console.log("서버 실행중@@@");
});
