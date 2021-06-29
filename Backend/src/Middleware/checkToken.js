const keys = require('../Config/Keys');
const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[0];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, keys.jwt, (err, user) => {
    if (err) return res.status(403).send({message: err});
    req.user = user;
    next();
  });
};

module.exports = checkToken;
