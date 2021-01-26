const axios = require("axios");
const { response } = require("express");
const fs = require("fs");
const https = require("https");

axios.defaults.timeout = 30000;
axios.defaults.httpsAgent = new https.Agent({ keepAlive: true });

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// let moviesArr = JSON.parse(fs.readFileSync("./top-10000-Movies.json"));
let moviesArr = require("./top-10000-Movies.json");
// moviesArr = moviesArr.slice(6700, 6805);

let api_params = {
    api_key: "ecb83265a11cb5ea5791bd8dd62a6f21",
    language: "en-US",
};

let imdbIDs = [];

const theMovieDBFetchIMDB_Ids = async () => {
    for (let index = 2; index < moviesArr.length; index++) {
        let movie = moviesArr[index];
        try {
            let response = await axios.get(
                `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${api_params.api_key}&language=${api_params.language}`
            );
            // await sleep(50);
            // let imdbid = response?.data?.imdb_id;
            let imdbid = response.data.imdb_id;
            imdbIDs.push({
                title: moviesArr[index].title,
                imdb_id: imdbid,
            });

            moviesArr[index].imdb_id = imdbid;
            if (index % 50 === 0) {
                console.log(`Index: ${index} | IMDB-ID: ${imdbid}`);
            }
        } catch (err) {
            if (err.response.status === 404) {
                let imdbid = null;
                imdbIDs.push({
                    title: moviesArr[index].title,
                    imdb_id: imdbid,
                });

                moviesArr[index].imdb_id = imdbid;
                console.log(
                    `Index: ${index} | IMDB-ID: ${imdbid} | 404 ERROR!!.. but we good.`
                );
            } else {
                throw err;
            }
        }
    }

    fs.writeFileSync(
        "./top-10000-MoviesIDs_WITH_IMDB-Ids.json",
        JSON.stringify(moviesArr, null, 4),
        "utf-8"
    );
};

theMovieDBFetchIMDB_Ids();

// console.log(moviesArr.slice(0, 5));
