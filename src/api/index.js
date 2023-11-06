module.exports = (app, container) => {
  const { verifyToken } = container.resolve('middleware')
  app.use(verifyToken)
  require('./feedApi')(app, container)
  require('./commentApi')(app, container)
  require('./reactionApi')(app, container)
  require('./uploadApi')(app, container)
  require('./userApi')(app, container)
  require('./friendApi')(app, container)
}
