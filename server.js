
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const { connectMysql } = require('./backend/mysql-connect.js')
const { createUser, usersTable } = require('./backend/mysql-table.js')
const app = express()





// Configurar EJS como template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

// Configurar BodyParser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Endpoint para renderizar o formulário de cadastro
app.get('/login', (req, res ) => {
    res.render('login')
})
app.get('/dashboard', (req,res) => {
    res.render('dashboard')  
})

app.get('/register', (req,res) => {
    res.render('register')
})

app.post('/data', async (req,res) => {
    const {email, password} = req.body

    try {
        const existingUser = await usersTable.findOne({where: {email}})

        if(existingUser) {
            return res.status(409).send('Ja existe um usuario com esse email.')
        }

        await createUser(email, password)
        res.status(201)
        res.redirect('/')
        res.send('Usuario cadastrado.' + email + password)
        
    } catch {
        res.status(501)
    }
})

app.get('/', async (req, res) => {
     try {
        // DESC OU ASC
        const usuarios = await usersTable.findAll({order: [['id', 'DESC']]}); // Correção aqui
        res.render('dashboard', { usuarios });
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).send('Erro ao carregar o dashboard.');
    }
})

app.get('/delete/:id', async (req, res) => {
    try {
        const deleteUser = await usersTable.destroy({where: {'id': req.params.id}})
        res.status(200).send('Usuario deletado.' + deleteUser)
    } catch {
        res.status(500).send('Errro')
    }
})


app.listen(4000, () => {
    console.log('servudir ativo')
    connectMysql()
})