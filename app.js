const express = require("express");
const app = express();
const PORT = process.argv[2] || 3000;

//bodyParser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//ejs
app.set("view engine", "ejs");

//static
app.use(express.static("public"));

//routes
app.use(require("./routes"));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
