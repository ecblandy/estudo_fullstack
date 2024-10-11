const {Sequelize, sequelize} = require('./mysql-connect')

const usersTable = sequelize.define('users', {
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
})

usersTable.sync()

const createUser = async (email, password) => {
    try {
        const newUser = await usersTable.create({
            email,
            password
        })
        console.log('Usuario cadastrado com sucesso' + newUser)
    } catch(error) {
        console.error(error)
    }
}


module.exports = {usersTable, createUser}