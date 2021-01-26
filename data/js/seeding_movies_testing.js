const moviesArr = require("../data/top-10000-Movies_FullDetails.json");
moviesArr.forEach((movie) => {
    imdbVotes = movie.imdbVotes;
    if (imdbVotes) {
        try {
            imdbVotes = parseInt(movie.imdbVotes.replaceAll(",", ""));

            if (Number.isNaN(imdbVotes)) {
                imdbVotes = null;
            }
        } catch (error) {
            imdbVotes = null;
        }
    }
    console.log(imdbVotes);
});
