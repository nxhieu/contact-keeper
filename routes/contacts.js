// crud for each user
const express = require("express");
const router = express.Router();
//@route  POST api/contacts
//@desc   Get all users contacts
//@access Private
router.post("/", (req, res) => {
  res.send("Get all contacts");
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
