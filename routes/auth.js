//authentication , check the login
const express = require("express");
const router = express.Router();
//@route  GET api/auth
//@desc   GET logged in user
//@access Private
router.get("/", (req, res) => {
  res.send("get logged in user");
});

//@route  POST api/auth
//@desc   AUTH user & get token
//@access Public
router.post("/", (req, res) => {
  res.send("Log in user");
});
//get request is getting data from server
//post submitting to server
//put update st on the server
//delete delete st on the server

//export the router
module.exports = router;
