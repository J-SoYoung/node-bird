const express = require("express");
const postRouter = require("./routes/post");
const app = express();

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

app.listen(3065, () => {
  console.log("서버 실행중");
});
