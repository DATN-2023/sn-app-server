const repo = (container) => {
  const feedRepo = require('./feedRepo')(container)
  const commentRepo = require('./commentRepo')(container)
  const reactionRepo = require('./reactionRepo')(container)
  const jobRepo = require('./jobRepo')(container)
  const uploadRepo = require('./uploadRepo')(container)
  return { feedRepo, jobRepo, commentRepo, reactionRepo, uploadRepo }
}
const connect = (container) => {
  const dbPool = container.resolve('redisHelper')
  if (!dbPool) throw new Error('Connect redis failed')
  return repo(container)
}

module.exports = { connect }
