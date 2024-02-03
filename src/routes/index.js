module.exports = (app) => {
    app.use('/festivaldujeu/api',require('./User.routes'))
    app.use('/festivaldujeu/api',require('./Role.routes'))
    app.use('/festivaldujeu/api',require('./Jeu.routes'))
    app.use('/festivaldujeu/api',require('./Zone.routes'))
    app.use('/festivaldujeu/api',require('./Poste.routes'))
    app.use('/festivaldujeu/api',require('./Festival.routes'))
    app.use('/festivaldujeu/api',require('./PlageHoraire.routes'))
    app.use('/festivaldujeu/api',require('./Creneau.routes'))
    app.use('/festivaldujeu/api',require('./Inscription.routes'))
}