//register route
const express = require("express");
const router = express.Router();
//@route  POST api/users
//@desc   Register a user
//@access Public
router.post("/", (req, res) => {
  res.send("Register a user");
});
//get request is getting data from server
//post submitting to server
//put update st on the server
//delete delete st on the server

//export the router
module.exports = router;
