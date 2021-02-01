"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class seenlists extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.seenlists.belongsTo(models.users, { foreignKey: "userid" });
            models.seenlists.belongsTo(models.movies, {
                foreignKey: "movieid",
            });
        }
    }
    seenlists.init(
        {
            userid: DataTypes.INTEGER,
            movieid: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "seenlists",
        }
    );
    return seenlists;
};
