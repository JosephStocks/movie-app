"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class movies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    movies.init(
        {
            title: DataTypes.STRING,
            year: DataTypes.INTEGER,
            synopsis: DataTypes.TEXT,
            genres: DataTypes.TEXT,
            mpaa_rating: DataTypes.STRING,
            imdb_rating: DataTypes.STRING,
            rottentom_rating: DataTypes.STRING,
            metacritic_rating: DataTypes.STRING,
            boxoffice: DataTypes.STRING,
            poster_rel_url: DataTypes.STRING,
            release_date: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "movies",
            timestamps: false,
        }
    );
    return movies;
};
