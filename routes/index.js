const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => {
    res.render("index");
});


router.get("/team", (req, res) => {
    res.render("team");
})

module.exports = router;
