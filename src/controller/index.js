module.exports = (container) => {
  const feedController = require('./feedController')(container)
  const commentController = require('./commentController')(container)
  const reactionController = require('./reactionController')(container)
  const uploadController = require('./uploadController')(container)
  const userController = require('./userController')(container)
  const friendController = require('./friendController')(container)
  return { feedController, commentController, reactionController, uploadController, userController, friendController }
}
