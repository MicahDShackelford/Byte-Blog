const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./db/user');
const Post = require('./db/post');
const Database = require('./db/database');
const TokenVerify = require('./auth/tokenVerification');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./client/public'));

app.use(express.json());
app.use('/', express.urlencoded({extended:false}));

app.get('/posts/retrieve', (req,res,next) => {
  Post
    .find({})
    .sort({postedTime: 1})
    .then((response) => {
      res.send(response);
    });
});

app.get('/post/retrieve/:postId', (req,res,next) => {
  Post
    .find({id: req.params.postId})
    .then((response) => {
      res.send(response);
    });
});

app.post('/auth/login', (req,res,next) => {
  if(req.body.username === "micah" && req.body.password === "1234") {
    jwt.sign({username: req.body.username}, 'secretkey', { expiresIn: '10h' }, (err, token) => {
      if(err) {
        res.send("Error")
      } else {
        res.send({
          ok: true,
          message: "Login success",
          token
        });
      }
    })
  }else {
    res.send({
      ok: false,
      message: "Incorrect username or password"
    });
  }
});

app.post('/auth/secure', TokenVerify, (req,res,next) => {
  console.log("Logged in user");

  next();
});

app.get('/post/create',(req,res,next) => {
  res.sendFile('index.html', {root: path.join('./client/public')})
});

app.get('/post/:postId',(req,res,next) => {
  res.sendFile('index.html', {root: path.join('./client/public')})
});

app.get('/auth/login',(req,res,next) => {
  res.sendFile('index.html', {root: path.join('./client/public')})
});

app.get('*',(req,res,next) => {
  res.send(`<html><head><title>404</title><body><h1>404 - Resource not found</h1></body></html>`);
});

app.listen(PORT, (e) => {
  if(e) {
    console.log(e);
  }else {
    console.log(`[Server] Listening on port ${PORT}`);
  }
})