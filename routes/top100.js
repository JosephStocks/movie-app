const express = require("express");
const router = express.Router();
const axios = require("axios");
let passport = require("passport");
const db = require("../models");
const { Op } = require("sequelize");

//action, horror, drama, comedy, SciFi
// grab json objects
// filter by number of imdbvotes (above a certain number)
// sort by imdb/rottentomatoes
// filter by top 50

// above 1000 imdb votes
// mpaa-rating = R
// sort by imdb rating descending G, PG, PG-13, R

router.get("/moviesByRated/:rated", async (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    let movieArr = await db.movies.findAll({
        where: {
            mpaa_rating: req.params.rated, //could be issue with whitespace!
            imdbvotes: {
                [Op.gte]: 1000, // square brackets are needed for property names that aren't plain strings
            },
        },
        order: [["imdb_rating", "DESC"]],
        limit: 100,
    });
    res.render("top100", {
        isAuthenticated,
        genreid: req.params.rated,
        movieArr,
        userId: req?.session?.passport?.user || null,
        pageID: "top100",
    });
});

router.get("/moviesByGenre/:genre", async (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    let movieArr = await db.movies.findAll({
        where: {
            // mpaa_rating: req.params.rated, //could be issue with whitespace!
            genres: {
                [Op.iLike]: `%${req.params.genre}%`,
            },
            imdbvotes: {
                [Op.gte]: 1000, // square brackets are needed for property names that aren't plain strings
            },
        },
        order: [["imdb_rating", "DESC"]],
        limit: 100,
    });
    res.render("top100", {
        isAuthenticated,
        genreid: req.params.genre,
        movieArr,
        userId: req?.session?.passport?.user || null,
        pageID: "top100",
    });
});

module.exports = router;
