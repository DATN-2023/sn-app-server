module.exports = (app, container) => {
  const { serverSettings } = container.resolve('config')
  const { userGroupController } = container.resolve('controller')
  const { basePath } = serverSettings
  app.put(`${basePath}/userGroups/:id`, userGroupController.updateUserGroup)
  app.put(`${basePath}/userGroups/:id/approve`, userGroupController.approveUserGroup)
  app.delete(`${basePath}/userGroups`, userGroupController.deleteUserGroupByUserAndGroup)
  app.delete(`${basePath}/userGroups/:id`, userGroupController.deleteUserGroup)
  app.post(`${basePath}/userGroups`, userGroupController.createUserGroup)
  app.get(`${basePath}/userGroups`, userGroupController.getUserGroup)
  app.get(`${basePath}/userGroups/:id`, userGroupController.getUserGroupById)
}
