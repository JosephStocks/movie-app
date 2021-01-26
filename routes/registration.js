const express = require("express");
const router = express.Router();
const axios = require("axios");
const db = require("../models");
const bcrypt = require("bcryptjs");

router.get("/registration", (req, res) => {
    res.render("registration");
});

router.post("/registration", async (req, res) => {
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    let password = req.body.password;

    try {
        let passwordEncrypted = bcrypt.hashSync(password, 8);

        let insertResult = await db.users.create({
            fname: fname,
            lname: lname,
            email: email,
            password: passwordEncrypted,
        });

        res.redirect("/");
    } catch (error) {
        res.send(`error can't register this username`);
    }
});

module.exports = router;
