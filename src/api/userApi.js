module.exports = (app, container) => {
  const { serverSettings } = container.resolve('config')
  const { userController } = container.resolve('controller')
  const { basePath } = serverSettings
  app.put(`${basePath}/users/:id`, userController.updateUser)
  app.delete(`${basePath}/users/:id`, userController.deleteUser)
  app.post(`${basePath}/users`, userController.createUser)
  app.get(`${basePath}/users`, userController.getUser)
  app.get(`${basePath}/users/me`, userController.getMe)
  app.get(`${basePath}/users/:id`, userController.getUserById)
}
