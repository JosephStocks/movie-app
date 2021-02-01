'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class watchlists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.watchlists.belongsTo(models.users, {foreignKey: 'userid'})
      models.watchlists.belongsTo(models.movies, {foreignKey: 'movieid'})
    }
  };
  watchlists.init({
    userid: DataTypes.INTEGER,
    movieid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'watchlists',
  });
  return watchlists;
};