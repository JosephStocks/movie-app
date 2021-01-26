"use strict";

const fullDetailsMovieArr = require("../data/data/top-10000-Movies_FullDetails.json");

let insertArr = [];

fullDetailsMovieArr.forEach((movieObj) => {
    let {
        title,
        Year,
        overview,
        Genre,
        Rated,
        Ratings,
        BoxOffice,
        poster_path,
        release_date,
    } = movieObj;

    let imdb_rating = "N/A";
    let rottentom_rating = "N/A";
    let metacritic_rating = "N/A";

    if (Ratings) {
        Ratings.forEach((rating) => {
            switch (rating.Source) {
                case "Internet Movie Database":
                    imdb_rating = rating.Value;
                    break;
                case "Rotten Tomatoes":
                    rottentom_rating = rating.Value;
                    break;
                case "Metacritic":
                    metacritic_rating = rating.Value;
                    break;
            }
        });
    }

    let newMovieObj = {
        title: title,
        year: Year,
        synopsis: overview,
        genres: Genre,
        mpaa_rating: Rated,
        imdb_rating,
        rottentom_rating,
        metacritic_rating,
        boxoffice: BoxOffice,
        poster_rel_url: poster_path,
        release_date: release_date,
    };
    insertArr.push(newMovieObj);
});

// console.log(insertArr);

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("movies", insertArr);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("movies", null, {});
    },
};
