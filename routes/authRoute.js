const express = require("express");
const passport = require("passport");
const keys = require("../config/keys");

module.exports = app => {
  app.get("/", (req, res) => {
    res.status(200).json({
      googleClientID: keys.googleClientID,
      googleCLientSecret: keys.googleClientSecret
    });
  });

  // google routes
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/profile"); // login case - redirect to profile page
    }
  );

  // facebook routes
  app.get("/auth/facebook", passport.authenticate("facebook"));

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/login" }),
    function(req, res) {
      console.log("i am in fb callback");
      // Successful authentication, redirect home.
      res.redirect("/profile");
    }
  );

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/"); // log out case
    // res.send(req.user);
  });
};
