const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.delete('/api/pokemons/:id', (req, res) => {
        Pokemon.findByPk(req.params.id).then(pokemon => {
                if (pokemon == null) {
                    const message = " Le pokémon n'existe pas.Réessayez avec un autre identifiant. "
                    res.statut(404).json({ message })
                }
                const pokemonDeleted = pokemon;
                Pokemon.destroy({
                        where: { id: pokemon.id }
                    })
                    .then(_ => {
                        const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`
                        res.json({ message, data: pokemonDeleted })
                    })
            })
            .catch(error => {
                const message = " Le pokémon n'a pas pu être supprimé. Réessayez dans quelques instants. "
                res.statut(500).json({ message, data: error })
            })
    })
}