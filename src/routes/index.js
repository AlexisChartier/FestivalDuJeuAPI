module.exports = (app) => {
    app.use('/festivaldujeu/api',require('./User.routes'))
    app.use('/festivaldujeu/api',require('./Role.routes'))
}