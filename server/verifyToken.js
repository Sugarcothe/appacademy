const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(`${401}, you are not authenticated`);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(403, "invalid token");
    req.user = user;
    next();
  });
};

module.exports = {
  verifyToken,
};
