//register route
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
//bring web token
const jwt = require("jsonwebtoken");
//bring config
const config = require("config");
//bring check and validation
const { check, validationResult } = require("express-validator/check");

const User = require("../models/User");
//@route  POST api/users
//@desc   Register a user
//@access Public
router.post(
  "/",
  [
    check("name", "Please add name")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      //check there is user
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }
      //if user doesnt exists then crerate an instance
      user = new User({
        name,
        email,
        password
      });
      //method bcrypt get salt to encrypt a password
      const salt = await bcrypt.genSalt(10);
      //take password and hash the password
      user.password = await bcrypt.hash(password, salt);
      //save user to database
      await user.save();
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
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
//limit what sends by validator
//field check + message + rule

//get request is getting data from server
//post submitting to server
//put update st on the server
//delete delete st on the server

//export the router
module.exports = router;
