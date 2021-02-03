const express = require("express");
const router = express.Router();
const axios = require("axios");
let passport = require("passport");
const db = require("../models");

//action, horror, drama, comedy, SciFi
// grab json objects
// filter by number of imdbvotes (above a certain number)
// sort by imdb/rottentomatoes
// filter by top 50

testObj = { genre: "horror" };

const savePreviousUrl = (req, res, next) => {
    res.cookie("savedRoute", req.originalUrl);
    next();
};

router.get("/", savePreviousUrl, (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    console.log(req?.session?.passport?.user);
    res.render("index", {
        isAuthenticated,
        genreList: testObj,
        userId: req?.session?.passport?.user || null,
        pageID: "home",
    });
});

router.get("/login", (req, res) => {
    res.render("login", {
        pageID: "login",
    });
});

router.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/login" }),
    (req, res) => {
        try {
            const savedRoute = req.cookies.savedRoute || "/";
            res.redirect(savedRoute);
        } catch (err) {
            res.redirect("/login");
        }
    }
);

router.get("/logout", (req, res) => {
    const savedRoute = req.cookies.savedRoute || "/";
    req.logout();
    req.session = null;
    res.redirect(savedRoute);
});

router.get("/team", savePreviousUrl, (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    res.render("team", {
        isAuthenticated,
        pageID: "team",
    });
});

module.exports = router;
