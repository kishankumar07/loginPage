const express = require("express");
const router = express.Router();
const path = require("path");
const auth = require("./middleware/userAuth");

// Instead of using a database to store the credentials, for the time being an object is used to store the credentials.
const credentials = {
  email: "kishantashok@gmail.com",
  password: "12345678",
};

//--------------- Load the login page--------------------------
router.get("/", auth.isLoggedOut, (req, res) => {
  res.setHeader("Cache-Control", "no-store, max-age=0");

  const message = req.flash("message");

  const logoutMessage = req.flash("logoutMessage");

  res.render("login", { message, logoutMessage });
});

//------------ Check credentials---------------------------------
router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (email === credentials.email && password === credentials.password) {
    req.session.userData = req.body;

    res.sendFile(path.join(__dirname, "views", "loading.html"));
  } else {
    req.flash("message", "Incorrect email or password");
    res.redirect("/");
  }
});

//------------------Load the home page-------------------------------
router.get("/home", auth.isLoggedIn, (req, res) => {
    
  const { name, email } = req.session.userData;
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.render("home", { name, email });
});

//-------------------------Logout route------------------------------
router.get("/logout", (req, res) => {
  req.session.userData = null;
  req.flash("logoutMessage", "Logged out successfully..!");
  res.redirect("/");
});

module.exports = router;
