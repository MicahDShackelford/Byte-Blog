const express     = require("express"),
      jwt         = require("jsonwebtoken"),
      User        = require("./db/user"),
      Post        = require("./db/post"),
      Comment     = require("./db/comments"),
      Database    = require("./db/database"),
      Counter     = require("./db/counter"),
      TokenVerify = require("./auth/tokenVerification"),
      path        = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("./client/public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/comments/retrieve/:commentId", (req, res, next) => {
  Comment.find({postId: req.params.commentId})
  .sort({ postedTime: 1 })
  .then(response => {
    res.send(response);
  });
});


app.get("/users/retrieve/:username", (req, res, next) => {
  User.findOne({username: req.params.username})
  .then(response => {
    res.send(response);
  });
});

app.get("/posts/retrieve", (req, res, next) => {
  Post.find({})
  .sort({ postedTime: 1 })
  .then(response => {
    res.send(response);
  });
});

app.post("/post/create", TokenVerify, (req,res,next) => {
  Counter.findOne({model: "post"}, (err, count) => {
    let post = new Post({
      id: count.count,
      title: req.body.title,
      topic: req.body.topic,
      author: req.body.author,
      post: req.body.post
    })
    count.count++;
    count.save();
    post.save();
    res.send({
      ok: true,
      message: "Post Success"
    });
  });
})

app.post("/comment/create", TokenVerify, (req,res,next) => {
  Counter.findOne({model: "comment"}, (err, count) => {
    let comment = new Comment({
      id: count.count,
      postId: req.body.postId,
      author: req.body.author,
      content: req.body.content
    })
    count.count++;
    count.save();
    comment.save();
    res.send({
      ok: true,
      message: "Post Success"
    });
  });
})

app.get("/post/retrieve/:postId", (req, res, next) => {
  Post.find({ id: req.params.postId }).then(response => {
    res.send(response);
  });
});

app.post("/auth/login", (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      res.send({
        ok: false,
        message: "Error: Server Error (Please Contact a System Administrator)"
      });
    } else {
      if (user === null) {
        res.send({
          ok: false,
          message: "Error: Incorrect Username/Password Combination"
        });
      } else {
        if (
          user.username === req.body.username &&
          user.password === req.body.password
        ) {
          jwt.sign(
            { username: req.body.username },
            "secretkey",
            { expiresIn: "10h" },
            (err, token) => {
              if (err) {
                res.send({
                  ok: false,
                  message:
                    "Error: Server Error (Please Contact a System Administrator)"
                });
              } else {
                res.send({
                  ok: true,
                  message: "Successful Login",
                  token,
                  user: {
                    id: user.id,
                    username: user.username,
                    role: user.role
                  }
                });
              }
            }
          );
        }
      }
    }
  });
});

app.get("/create", (req, res, next) => {
  res.sendFile("index.html", { root: path.join("./client/public") });
});

app.get("/post/:postId", (req, res, next) => {
  res.sendFile("index.html", { root: path.join("./client/public") });
});

app.get("/auth/login", (req, res, next) => {
  res.sendFile("index.html", { root: path.join("./client/public") });
});

app.get("/auth/test", (req, res, next) => {
  res.sendFile("index.html", { root: path.join("./client/public") });
});

app.get("*", (req, res, next) => {
  res.send(
    `<html><head><title>404</title><body><h1>404 - Resource not found</h1></body></html>`
  );
});

app.post("/auth/tokenVerification", TokenVerify, (req, res, next) => {
  res.end();
});

app.listen(PORT, e => {
  if (e) {
    console.log(e);
  } else {
    console.log(`[Server] Listening on port ${PORT}`);
  }
});
