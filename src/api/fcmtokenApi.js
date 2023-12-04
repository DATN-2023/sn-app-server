module.exports = (app, container) => {
  const { serverSettings } = container.resolve('config')
  const { fcmtokenController } = container.resolve('controller')
  const { basePath } = serverSettings
  app.put(`${basePath}/fcmtokens/:id`, fcmtokenController.updateFcmtoken)
  app.delete(`${basePath}/fcmtokens`, fcmtokenController.deleteFcmtoken)
  app.post(`${basePath}/fcmtokens`, fcmtokenController.createFcmtoken)
}
