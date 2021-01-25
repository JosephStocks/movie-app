const express = require("express");
const router = express.Router();
const axios = require("axios");
let passport = require('passport');
const authReq = require('../auth');

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/team", (req, res) => {
    res.render("team");
})

router.post('/', passport.authenticate('local', {
    successRedirect: '/', 
    failureRedirect: '/registration'
}))


module.exports = router;
