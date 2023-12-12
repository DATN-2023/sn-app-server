module.exports = (app, container) => {
  const { serverSettings } = container.resolve('config')
  const { chatController } = container.resolve('controller')
  const { basePath } = serverSettings
  app.put(`${basePath}/channels/:id`, chatController.updateChannel)
  app.delete(`${basePath}/channels/:id`, chatController.deleteChannel)
  app.post(`${basePath}/channels`, chatController.createChannel)
  app.get(`${basePath}/messages`, chatController.getMessage)
  app.get(`${basePath}/messages/:id`, chatController.getMessageById)
}
