'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      synopsis: {
        type: Sequelize.TEXT
      },
      genres: {
        type: Sequelize.TEXT
      },
      mpaa_rating: {
        type: Sequelize.STRING
      },
      imdb_rating: {
        type: Sequelize.STRING
      },
      rottentom_rating: {
        type: Sequelize.STRING
      },
      metacritic_rating: {
        type: Sequelize.STRING
      },
      boxoffice: {
        type: Sequelize.STRING
      },
      poster_rel_url: {
        type: Sequelize.STRING
      },
      release_date: {
        type: Sequelize.DATE
      },
      // createdAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // },
      // updatedAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('movies');
  }
};