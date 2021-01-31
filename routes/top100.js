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

router.get("/movielist/:genreid", (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    res.render("top100", {
        isAuthenticated,
        genreid: req.params.genreid,
    });
});

module.exports = router;
