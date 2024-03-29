module.exports = (app, container) => {
  const { serverSettings } = container.resolve('config')
  const { feedController } = container.resolve('controller')
  const { basePath } = serverSettings
  app.put(`${basePath}/feeds/:id`, feedController.updateFeed)
  app.delete(`${basePath}/feeds/:id`, feedController.deleteFeed)
  app.post(`${basePath}/feeds`, feedController.createFeed)
  app.get(`${basePath}/feeds`, feedController.getFeed)
  app.get(`${basePath}/feeds/users`, feedController.getFeedsOfUser)
  app.get(`${basePath}/feeds/:id`, feedController.getFeedById)
}
