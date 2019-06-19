//log in(register), get and test the token and send the token to access the protected route
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
//bring web token
const jwt = require("jsonwebtoken");
//bring config
const config = require("config");
//bring middlerware
const auth = require("../middleware/auth");
//bring check and validation
const { check, validationResult } = require("express-validator/check");

const User = require("../models/User");
//@route  GET api/auth
//@desc   GET logged in user
//@access Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route  POST api/auth
//@desc   AUTH user & get token
//@access Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      //see if the user exists
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      //if there is a user
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      //send back to user
      const payload = {
        user: {
          id: user.id
        }
      };
      //generate token we need to sign it . put payload, secret, object of options (in this case token get destroyed after an hour)

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);
//get request is getting data from server
//post submitting to server
//put update st on the server
//delete delete st on the server

//export the router
module.exports = router;
