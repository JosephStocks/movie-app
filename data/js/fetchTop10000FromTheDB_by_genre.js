const axios = require("axios");
const fs = require("fs");
const https = require("https");

const genresObj = require("./genreID_to_genre_mapping.json");

genresArr = [];
for (const id in genresObj) {
    if (Object.hasOwnProperty.call(genresObj, id)) {
        const genre = genresObj[id];
        genresArr.push({ id: id, genre: genre });
    }
}

axios.defaults.timeout = 30000;
axios.defaults.httpsAgent = new https.Agent({ keepAlive: true });

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const theMovieDBFetchTop10000_by_genre = async (genreid, genre) => {
    try {
        let response = await axios.get(
            "https://api.themoviedb.org/3/discover/movie",
            {
                params: {
                    api_key: "ecb83265a11cb5ea5791bd8dd62a6f21",
                    language: "en-US",
                    page: 1,
                    include_adult: false,
                    with_original_language: "en",
                    region: "US",
                    sort_by: "popularity.desc",
                    include_video: false,
                    with_genres: genreid,
                },
            }
        );
        let moviesArr = response.data.results;
        let totalPages = response.data.total_pages;

        for (let page = 2; page <= totalPages; page++) {
            let response = await axios.get(
                "https://api.themoviedb.org/3/discover/movie",
                {
                    params: {
                        api_key: "ecb83265a11cb5ea5791bd8dd62a6f21",
                        language: "en-US",
                        page: page,
                        include_adult: false,
                        with_original_language: "en",
                        region: "US",
                        sort_by: "popularity.desc",
                        include_video: false,
                        with_genres: genreid,
                    },
                }
            );

            moviesArr = moviesArr.concat(response.data.results);
            console.log(`Page: ${page} | Array Length: ${moviesArr.length}`);
            await sleep(20);
        }
        console.log(moviesArr.length);
        console.log(`ID: ${genreid} | Genre: ${genre}`);
        fs.writeFileSync(
            `./top-10000-Movies_genreid_${genreid}_${genre}.json`,
            JSON.stringify(moviesArr, null, 4),
            "utf-8"
        );
    } catch (error) {
        console.error(error);
    }
};

(async () => {
    for (let index = 0; index < genresArr.length; index++) {
        let { id, genre } = genresArr[index];
        await theMovieDBFetchTop10000_by_genre(id, genre);
        await sleep(500);
    }
})();
