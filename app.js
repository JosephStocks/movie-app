const express = require("express");
const app = express();
const helmet = require("helmet");
const PORT = process.argv[2] || 3000;
const cookieParser = require('cookie-parser')

//bodyParser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//passport
const passport = require("passport");
require("./auth/passport-config")(passport);

var cookieSession = require("cookie-session");

app.use(
    cookieSession({
        name: "session",
        keys: ["lsdjfs;ldjs;lkjdl;skdjf;lsdkjf"],
        maxAge: 14 * 24 * 60 * 60 * 1000,
    })
);

//ejs
app.set("view engine", "ejs");

//static
app.use(express.static("public"));

app.use(cookieParser())

app.use(helmet());
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use(require("./routes"));
app.use(require("./routes/registration"));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
