const express = require("express");
const router = express.Router();
const axios = require("axios");
let passport = require("passport");




router.get("/", (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    res.render("index", {
        isAuthenticated,
    });
});

router.get('/login', (req, res) => {
    res.render('login')
})


router.post('/login', passport.authenticate('local', { 
    successRedirect: '/', 
    failureRedirect: '/login'
    
}))

router.get("/logout", (req, res) => {
    req.logout();
    req.session = null;
    res.redirect("/");
});


router.get("/team", (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    res.render("team", {
        isAuthenticated
    });
})

module.exports = router;
