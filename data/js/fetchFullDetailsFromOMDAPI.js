let top10000Arr = require("../data/top-10000-MoviesIDs_WITH_IMDB_and_genres.json");

//////////////////////////////////////////////////////
const axios = require("axios");
const fs = require("fs");
const https = require("https");

axios.defaults.timeout = 30000;
axios.defaults.httpsAgent = new https.Agent({ keepAlive: true });

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const fetchFullDetailsfromOMDBAPI = async () => {
    try {
        for (let index = 0; index < top10000Arr.length; index++) {
            let imdb_id = top10000Arr[index].imdb_id;
            let response = await axios.get(
                `http://private.omdbapi.com/?i=${imdb_id}&apikey=9a14bb73`
            );
            top10000Arr[index] = {
                ...top10000Arr[index],
                ...response.data,
            };
            if (index % 50 === 0) {
                console.log(`Index: ${index} | Movie: ${response.data.Title}`);
            }
            await sleep(100);
        }

        //private.omdbapi.com/?i=tt8354582&apikey=9a14bb73

        fs.writeFileSync(
            "../data/top-10000-Movies_FullDetails.json",
            JSON.stringify(top10000Arr, null, 4),
            "utf-8"
        );
    } catch (error) {
        console.error(error);
    }
};

fetchFullDetailsfromOMDBAPI();
