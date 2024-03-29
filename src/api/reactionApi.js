module.exports = (app, container) => {
  const { serverSettings } = container.resolve('config')
  const { reactionController } = container.resolve('controller')
  const { basePath } = serverSettings
  app.put(`${basePath}/reactions/:id`, reactionController.updateReaction)
  app.delete(`${basePath}/reactions/feeds/:id`, reactionController.deleteReaction)
  app.post(`${basePath}/reactions`, reactionController.createReaction)
  app.get(`${basePath}/reactions`, reactionController.getReaction)
  app.get(`${basePath}/reactions/:id`, reactionController.getReactionById)
}
