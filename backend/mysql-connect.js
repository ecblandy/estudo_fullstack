const Sequelize = require('sequelize')

// Informações login MYSQL
const $dataBank = 'users_bank'
const $userMysql = 'root'
const $passwordMysql = 'Bahia5988'


const sequelize = new Sequelize($dataBank, $userMysql, $passwordMysql, {
    host: 'localhost',
    dialect: 'mysql'
})


const connectMysql = async () => {
    try {
        await sequelize.authenticate()
        console.log('Você foi autenticado.')
    } catch(err) {
        console.log('Deu ruim: ' + err)
    }
}
connectMysql()

module.exports = { Sequelize, sequelize, connectMysql}