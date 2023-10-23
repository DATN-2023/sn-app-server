const repo = (container) => {
  const feedRepo = require('./feedRepo')(container)
  const jobRepo = require('./jobRepo')(container)
  return { feedRepo, jobRepo }
}
const connect = (container) => {
  const dbPool = container.resolve('redisHelper')
  if (!dbPool) throw new Error('Connect redis failed')
  return repo(container)
}

module.exports = { connect }
