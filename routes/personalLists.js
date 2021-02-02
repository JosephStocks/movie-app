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

router.get("/favorites", async (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    let movieArr = await db.favorites.findAll({
        where: {
            userid: req?.session?.passport?.user || null ,
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
        userId: req.params.userid,
    });
});

router.post("/favorites", async (req, res) => {
    
    let movie = await db.movies.findOne({
        where: {
            id: req.body.id 
        }
    });

    if (movie) {
        await db.favorites.create({
            userid: req.session.passport.user,
            movieid: movie.id
        })
    }
})

router.get("/seenlist", async (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    let movieArr = await db.seenlists.findAll({
        where: {
            userid: req?.session?.passport?.user || null,
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
        userId:  req?.session?.passport?.user || null,
    });
});

router.post("/seenlist", async (req, res) => {
    let movie = await db.movies.findOne({
        where: {
            id: req.body.id 
        }
    });

    if (movie) {
        await db.seenlists.create({
            userid: req.session.passport.user,
            movieid: movie.id
        })
    }
})


router.get("/watchlist", async (req, res) => {
    console.log('Here')
    const isAuthenticated = req.isAuthenticated();
    let movieArr = await db.watchlists.findAll({
        where: {
            userid:  req?.session?.passport?.user || null,
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
        userId:  req?.session?.passport?.user || null,
    });
});

router.post("/watchlist", async (req, res) => {
    let movie = await db.movies.findOne({
        where: {
            id: req.body.id 
        }
    });

    console.log(movie)

    if (movie) {
        console.log(movie)
        await db.watchlists.create({
            userid: req.session.passport.user,
            movieid: movie.id
        })
    }
})

module.exports = router;
