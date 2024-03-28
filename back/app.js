const express = require("express");
const app = express();
const cors = require("cors");

const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const db = require("./models");

db.sequelize
  .sync()
  .then(() => {
    console.log("db연결성공");
  })
  .catch(console.error);

// use 안에 들어가는 것들 => 미들웨어
app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);
// express 서버실행. app의 제일 처음으로 작성해줘야 함.
app.use(express.json());
// 프론트에서 받은 데이터를 req.body에 넣음
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello express");
});

app.get("/api", (req, res) => {
  res.send("hello express API");
});

app.get("/api/post", (req, res) => {
  res.json([
    { id: 2, content: "thdud1" },
    { id: 3, content: "thdud2" },
    { id: 4, content: "thdud3" },
  ]);
  res.send("hello express API");
});

app.use("/post", postRouter);
app.use("/user", userRouter);

app.listen(3065, () => {
  console.log("서버 실행중@@@");
});
