const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./db/user');
const Database = require('./db/database');
const TokenVerify = require('./auth/tokenVerification');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

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

app.listen(PORT, (e) => {
  if(e) {
    console.log(e);
  }else {
    console.log(`[Server] Listening on port ${PORT}`);
  }
})