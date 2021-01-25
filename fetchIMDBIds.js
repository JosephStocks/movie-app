const axios = require("axios");
const fs = require("fs");
const https = require("https");

axios.defaults.timeout = 30000;
axios.defaults.httpsAgent = new https.Agent({ keepAlive: true });

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// let moviesArr = JSON.parse(fs.readFileSync("./top-10000-Movies.json"));
let moviesArr = require("./top-10000-Movies.json");
moviesArr = moviesArr.slice(0, 200);

let api_params = {
    api_key: "ecb83265a11cb5ea5791bd8dd62a6f21",
    language: "en-US",
};

let imdbIDs = [];

const theMovieDBFetchIMDB_Ids = async () => {
    try {
        for (let index = 2; index < moviesArr.length; index++) {
            let movie = moviesArr[index];
            let response = await axios.get(
                `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${api_params.api_key}&language=${api_params.language}`
            );

            // await sleep(50);
            imdbIDs.append({
                title: moviesArr[index].title,
                imdb_id: response.data.imdb_id,
            });

            moviesArr[index].imdb_id = response.data.imdb_id;
            console.log(`Index: ${index} | IMDB-ID: ${response.data.imdb_id}`);
        }

        fs.writeFileSync(
            "./top-10000-MoviesIDs_WITH_IMDB-Ids.json",
            JSON.stringify(moviesArr, null, 4),
            "utf-8"
        );
    } catch (error) {
        console.error(error);
    }
};

theMovieDBFetchIMDB_Ids();

// console.log(moviesArr.slice(0, 5));
