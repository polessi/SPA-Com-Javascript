const Sequelize = require('sequelize');
const db = require('./db');

const Users = db.define('tb_users', {
    idUsers: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    sobrenome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    dataNascimento: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    genero: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

//Criar a tabela
// Users.sync();

module.exports = Users;