module.exports = (container) => {
  const feedController = require('./feedController')(container)
  const commentController = require('./commentController')(container)
  const reactionController = require('./reactionController')(container)
  const uploadController = require('./uploadController')(container)
  const userController = require('./userController')(container)
  const friendController = require('./friendController')(container)
  const groupController = require('./groupController')(container)
  const userGroupController = require('./userGroupController')(container)
  const modController = require('./modController')(container)
  const notificationController = require('./notificationController')(container)
  const fcmtokenController = require('./fcmtokenController')(container)
  const chatController = require('./chatController')(container)
  return {
    feedController,
    commentController,
    reactionController,
    uploadController,
    userController,
    friendController,
    groupController,
    userGroupController,
    modController,
    notificationController,
    fcmtokenController,
    chatController
  }
}
