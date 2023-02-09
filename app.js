const express = require('express');
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')
const favicon = require('serve-favicon')

const app = express()
const port = process.env.PORT || 3000


app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(bodyParser.json())

sequelize.initDb()

app.get('/', (req, res) => {
        res.json('Hello, Heroku !')
    })
    // Ici , on place nos différents points de terminaison .
require('./src/routes/findAllPokemons.js')(app)
require('./src/routes/findPokemonByPk.js')(app)
require('./src/routes/createPokemon.js')(app)
require('./src/routes/updatePokemon.js')(app)
require('./src/routes/deletePokemon.js')(app)
require('./src/routes/login')(app)

//On ajoute la gestion pour l'erreur 404
app.use(({ res }) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL .'
    res.status(404).json({ message })
})

app.listen(port, () => console.log(`
            Notre application Node est démarrée sur: http: //localhost:${port}`))