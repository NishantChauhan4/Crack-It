const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
  const token = req.cookies ? req.cookies.token : null;

  if (!token) {
    res.redirect("/login");
  } else {
    jwt.verify(token, "key", (err, decoded) => {
      if (err) {
        res.redirect("/login");
      }
      req.userData = decoded;
      next();
    });
  }
}

module.exports = isAuthenticated;
