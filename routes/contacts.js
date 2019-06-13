// crud for each user
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator/check");

const User = require("../models/User");
const Contact = require("../models/Contact");
//@route  GET api/contacts
//@desc   Get all users contacts
//@access Private
router.get("/", auth, async (req, res) => {
  try {
    //-1 means the most recent contact first
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//@route  PUT api/contacts/:id
//@desc   Update contacts
//@access Private
router.put("/:id", (req, res) => {
  res.send("Update contact");
});

//@route  DELETE api/contacts/:id
//@desc   DELETE contacts
//@access Private
router.delete("/:id", (req, res) => {
  res.send("Delete contact");
});
//get request is getting data from server
//post submitting to server
//put update st on the server
//delete delete st on the server

//export the router
module.exports = router;
