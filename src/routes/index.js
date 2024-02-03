module.exports = (app) => {
    app.use('/festivaldujeu/api',require('./User.routes'))
    app.use('/festivaldujeu/api',require('./Role.routes'))
    app.use('/festivaldujeu/api',require('./Jeu.routes'))
    app.use('/festivaldujeu/api',require('./Zone.routes'))
}