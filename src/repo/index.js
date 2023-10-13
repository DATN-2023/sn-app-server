const repo = (container) => {
  const testRepo = require('./testRepo')(container)
  return { testRepo }
}
const connect = (container) => {
  const dbPool = container.resolve('redisHelper')
  if (!dbPool) throw new Error('Connect redis failed')
  return repo(container)
}

module.exports = { connect }
