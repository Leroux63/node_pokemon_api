const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Le nom est déjà pris.'
            },
            validate: {
                notEmpty: { msg: 'Le nom du pokémon est requis' },
                notNull: { msg: 'Le nom du pokémon est une propriété requise.' }
            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: {
                    args: [0],
                    msg: 'Les points de vie doivent être supérieur ou égal à 0 .'
                },
                max: {
                    args: [999],
                    msg: 'Les points de vie doivent être inférieur ou égal à 999 .'
                },
                isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de vies .' },
                notNull: { msg: 'Les points de vie sont une propriété requise.' }
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: {
                    args: [0],
                    msg: 'Les points de dégâts doivent être supérieur ou égal à 0 .'
                },
                max: {
                    args: [99],
                    msg: 'Les points de dégâts doivent être inférieur ou égal à 99 .'
                },
                isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de dégâts .' },
                notNull: { msg: 'Les points de dégâts sont une propriété requise.' }
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: { msg: 'Utilisez uniquement une URL valide pour l\'image.' },
                notNull: { msg: "L'url doit être remplie pour l'image du pokémon ." }
            }
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('types').split(',')
            },
            set(types) {
                return this.setDataValue('types', types.join())
            },
            validate: {
                isTypesValid(value) {
                    if (!value) {
                        throw new Error('Un pokémon doit au moins avoir un type .')
                    }
                    if (value.split(',').lengh > 3) {
                        throw new Error('Un pokémon ne peut pas avoir plus de trois types.')
                    }
                    value.split(',').forEach(type => {
                        if (!validTypes.includes(type)) {
                            throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante:${validTypes}`)
                        }

                    });
                }
            }
        }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}