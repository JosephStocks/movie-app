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
            movies.hasMany(models.favorites, { foreignKey: "movieid" });
            movies.hasMany(models.seenlists, { foreignKey: "movieid" });
            movies.hasMany(models.watchlists, { foreignKey: "movieid" });
        }
    }
    movies.init(
        {
            title: DataTypes.STRING,
            year: DataTypes.INTEGER,
            synopsis: DataTypes.TEXT,
            genres: DataTypes.TEXT,
            mpaa_rating: DataTypes.STRING,
            imdb_rating: DataTypes.FLOAT,
            rottentom_rating: DataTypes.INTEGER,
            metacritic_rating: DataTypes.INTEGER,
            boxoffice: DataTypes.INTEGER,
            poster_rel_url: DataTypes.STRING,
            release_date: DataTypes.DATE,
            imdbvotes: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "movies",
            timestamps: false,
        }
    );
    return movies;
};
