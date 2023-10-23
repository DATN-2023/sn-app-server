module.exports = (app, container) => {
  const { verifyToken } = container.resolve('middleware')
  app.use(verifyToken)
  require('./feedApi')(app, container)
}
