// omdbapi:
// search by imdb id: http://www.omdbapi.com/?i=tt3896198&apikey=9a14bb73
// Movie title search: http://www.omdbapi.com/?t=the+matrix&apikey=9a14bb73
// can get longer plot: http://www.omdbapi.com/?t=the+matrix&apikey=9a14bb73&plot=full
// the movie database:
// multi-search: https://api.themoviedb.org/3/search/multi?api_key=ecb83265a11cb5ea5791bd8dd62a6f21&language=en-US&query=jon+favreau&page=1&include_adult=false
// movie search: https://api.themoviedb.org/3/search/movie?api_key=ecb83265a11cb5ea5791bd8dd62a6f21&language=en-US&query=the+matrix&page=1&include_adult=false

const axios = require("axios");

const theMovieDBFetch = async () => {
    try {
        let response = await axios.get(
            "https://api.themoviedb.org/3/search/multi",
            {
                params: {
                    api_key: "ecb83265a11cb5ea5791bd8dd62a6f21",
                    language: "en-US",
                    query: "Jon Favreau".trim().toLowerCase().replace(" ", "+"),
                    page: 1,
                    include_adult: false,
                },
            }
        );
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

theMovieDBFetch();
