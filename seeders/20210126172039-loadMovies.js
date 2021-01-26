"use strict";

const fullDetailsMovieArr = require("../data/data/top-10000-Movies_FullDetails.json");

let insertArr = [];

fullDetailsMovieArr.forEach((movieObj) => {
    let {
        title,
        overview,
        Genre = null,
        Rated = null,
        Ratings = null,
        BoxOffice = null,
        poster_path,
        release_date,
        imdbVotes = null,
    } = movieObj;

    let imdb_rating = null;
    let rottentom_rating = null;
    let metacritic_rating = null;

    if (Ratings) {
        Ratings.forEach((rating) => {
            switch (rating.Source) {
                case "Internet Movie Database":
                    imdb_rating = Number(rating.Value.split("/")[0]);
                    break;
                case "Rotten Tomatoes":
                    rottentom_rating = parseInt(rating.Value.split("%")[0]);
                    break;
                case "Metacritic":
                    metacritic_rating = parseInt(rating.Value.split("/")[0]);
                    break;
            }
        });
    }

    if (BoxOffice) {
        try {
            BoxOffice = parseInt(BoxOffice.slice(1).replaceAll(",", ""));

            if (Number.isNaN(BoxOffice)) {
                BoxOffice = null;
            }
        } catch (error) {
            BoxOffice = null;
        }
    }

    if (imdbVotes) {
        try {
            imdbVotes = parseInt(imdbVotes.replaceAll(",", ""));
            if (Number.isNaN(imdbVotes)) {
                imdbVotes = null;
            }
        } catch (error) {
            imdbVotes = null;
        }
    }
    console.log(BoxOffice);

    let newMovieObj = {
        title: title,
        year: parseInt(release_date.split("-")[0]),
        synopsis: overview,
        genres: Genre,
        mpaa_rating: Rated,
        imdb_rating,
        rottentom_rating,
        metacritic_rating,
        boxoffice: BoxOffice,
        poster_rel_url: poster_path,
        release_date: release_date,
        imdbvotes: imdbVotes,
    };
    insertArr.push(newMovieObj);
});

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("movies", insertArr);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("movies", null, {});
    },
};
