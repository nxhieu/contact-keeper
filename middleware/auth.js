//middleware is a function that has access to request and respond cycle
//everytime we hit and endpoint we can fire off this middleware and
//we want to check to see if there is a token in the header
//middleware allows us to send token within the header when we want to access a protected route
const jwt = require("jsonwebtoken");
const config = require("config");
//next mean moving on next piece of midware
module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  //Check if not token
  if (!token) {
    return res.status(401).json({ msg: " No token, Authorization denied" });
  }
  try {
    //payload put into decoded
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    //take user out (userid) and set user in payload to res.user so we have access inside the route
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
