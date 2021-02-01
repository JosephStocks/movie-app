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

router.get("/favorites/:userid", async (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    let movieArr = await db.favorites.findAll({
        where: {
            userid: req.params.userid,
        },
        include: [
            {
                model: db.movies,
            },
        ],
        raw: true,
    });
    res.render("personalLists", {
        isAuthenticated,
        pageTitle: "My Favorites",
        movieArr,
        userid: req.params.userid,
    });
});

router.get("/seenlist/:userid", async (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    let movieArr = await db.seenlists.findAll({
        where: {
            userid: req.params.userid,
        },
        include: [
            {
                model: db.movies,
            },
        ],
        raw: true,
    });
    res.render("personalLists", {
        isAuthenticated,
        pageTitle: "Seen List",
        movieArr,
        userid: req.params.userid,
    });
});
router.get("/watchlist/:userid", async (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    let movieArr = await db.watchlists.findAll({
        where: {
            userid: req.params.userid,
        },
        include: [
            {
                model: db.movies,
            },
        ],
        raw: true,
    });
    res.render("personalLists", {
        isAuthenticated,
        pageTitle: "Want To Watch List",
        movieArr,
        userid: req.params.userid,
    });
});

module.exports = router;
