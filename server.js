//bring in module common.js
const express = require("express");
//init express into var called app
const app = express();
//add a route
app.get("/", (rep, res) =>
  res.json({ msg: "Welcome to the Contactkeeper API..." })
);
//define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));
//look for environment variable called Port or
const PORT = process.env.PORT || 5000;
//listen method taking a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
