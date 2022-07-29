const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token || token == '') return res.status(401).json({ message: "Unauthorized" });

    const verified = await jwt.verify(token, process.env.SECRET);
    req.user = verified.key;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = {auth};