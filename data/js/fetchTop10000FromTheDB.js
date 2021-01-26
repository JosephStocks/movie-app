const axios = require("axios");
const fs = require("fs");
const https = require("https");

axios.defaults.timeout = 30000;
axios.defaults.httpsAgent = new https.Agent({ keepAlive: true });

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const theMovieDBFetchTop10000 = async () => {
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
                },
            }
        );
        let moviesArr = response.data.results;
        let totalPages = response.data.total_pages;
        // totalPages = 5;

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
                    },
                }
            );

            moviesArr = moviesArr.concat(response.data.results);
            console.log(`Page: ${page} | Array Length: ${moviesArr.length}`);
            await sleep(500);
        }
        console.log(moviesArr.length);
        fs.writeFileSync(
            "./top-10000-Movies.json",
            JSON.stringify(moviesArr, null, 4),
            "utf-8"
        );
    } catch (error) {
        console.error(error);
    }
};

theMovieDBFetchTop10000();
