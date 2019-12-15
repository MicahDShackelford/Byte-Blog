const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
const User = require("../db/user");

const ProtectedRoute = (req, res, next) => {
  let bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, "secretkey", (err, result) => {
      if (err) {
        res.send({
          ok: false,
          message: "Invalid Token"
        });
      } else {
        User.findOne(
          { username: jwtDecode(bearerToken).username },
          (err, user) => {
            if (err) {
              res.send({
                ok: false,
                message: "Server error"
              });
            } else {
              next();
            }
          }
          );
        }
    });
  } else {
    res.send({
      ok: false,
      message: "Token not present"
    });
  }
};

module.exports = ProtectedRoute;