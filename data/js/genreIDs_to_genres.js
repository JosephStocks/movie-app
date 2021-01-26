let moviesArr = require("./top-10000-MoviesIDs_WITH_IMDB-Ids.json");
let genreIDs = require("./theMovieDB_genre-IDs.json");
const fs = require("fs");

// let id_to_genre_map = {};

// genreIDs.genres.forEach((genre) => {
//     let { id, name } = genre;
//     id_to_genre_map[id] = name;
// });

// console.log(id_to_genre_map);

// fs.writeFileSync(
//     "./genreID_to_genre_mapping.json",
//     JSON.stringify(id_to_genre_map, null, 4),
//     "utf-8"
// );

let genreID_to_genre_map = require("./genreID_to_genre_mapping.json");

moviesArr.forEach((movie, index) => {
    let ids = movie.genre_ids;
    let genres = [];
    moviesArr[index].genres = genres;
    ids.forEach((id) => {
        moviesArr[index].genres.push(genreID_to_genre_map[id]);
    });
});

fs.writeFileSync(
    "./top-10000-MoviesIDs_WITH_IMDB_and_genres.json",
    JSON.stringify(moviesArr, null, 4),
    "utf-8"
);
