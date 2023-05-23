const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleWare = multer({
  limits: { fieldSize: 25 * 1024 * 1024 },
  dest: "uploads/",
});
const fs = require("fs");

const app = express();
require("dotenv").config();

const User = require("./models/User");
const Post = require("./models/Post");
const dbPassword = process.env.DB_PASSWORD;
const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRET;

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5177",
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose.connect(
  `mongodb+srv://eliasdb3:${dbPassword}@blog.ql8tvop.mongodb.net/?retryWrites=true&w=majority`
);

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = userDoc && bcrypt.compareSync(password, userDoc.password);
  //   res.json(passOk);
  if (passOk) {
    jwt.sign({ username, id: userDoc._id }, secret, (error, token) => {
      if (error) throw error;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json("Wrong credentials");
  }
});

app.get("/api/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (error, info) => {
    if (error) throw error;
    res.json(info);
  });
  //   res.json(req.cookies);
});

app.post("/api/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/api/post", uploadMiddleWare.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = "uploads/" + parts[0] + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;

  jwt.verify(token, secret, {}, async (error, info) => {
    if (error) throw error;
    const { title, summary, content } = req.body;

    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(postDoc);
  });
});

app.put("/api/post", uploadMiddleWare.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = "uploads/" + parts[0] + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;

  jwt.verify(token, secret, {}, async (error, info) => {
    if (error) throw error;
    const { title, summary, content, id } = req.body;

    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("You are not the author");
    }

    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });

    res.json(postDoc);
  });
});

app.get("/api/post", async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", "username")
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

app.get("/api/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", "username");
  res.json(postDoc);
});

if (process.env.API_PORT) {
  app.listen(process.env.API_PORT);
}

module.exports = app;
