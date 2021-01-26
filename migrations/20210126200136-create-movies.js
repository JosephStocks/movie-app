"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("movies", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                type: Sequelize.STRING,
            },
            year: {
                type: Sequelize.INTEGER,
            },
            synopsis: {
                type: Sequelize.TEXT,
            },
            genres: {
                type: Sequelize.TEXT,
            },
            mpaa_rating: {
                type: Sequelize.STRING,
            },
            imdb_rating: {
                type: Sequelize.FLOAT,
            },
            rottentom_rating: {
                type: Sequelize.INTEGER,
            },
            metacritic_rating: {
                type: Sequelize.INTEGER,
            },
            boxoffice: {
                type: Sequelize.INTEGER,
            },
            poster_rel_url: {
                type: Sequelize.STRING,
            },
            release_date: {
                type: Sequelize.DATE,
            },
            imdbvotes: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable("movies");
    },
};
