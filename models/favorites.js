"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class favorites extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.favorites.belongsTo(models.users, { foreignKey: "userid" });
            models.favorites.belongsTo(models.movies, {
                foreignKey: "movieid",
            });
        }
    }
    favorites.init(
        {
            userid: DataTypes.INTEGER,
            movieid: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "favorites",
        }
    );
    return favorites;
};
