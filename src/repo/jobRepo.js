module.exports = (container) => {
  const redisHelper = container.resolve('redisHelper')
  const prefix = 'job'
  const isRunning = async (name) => {
    const val = await redisHelper.get(`${prefix}-${name}`)
    return !!val
  }
  const addJob = (name) => {
    // them 10s expire để tránh trường hợp đang update thì server chết,10s sau tự lên lại
    return redisHelper.set(`${prefix}-${name}`, '1', '10s')
  }
  const removeJob = (name) => {
    return redisHelper.del(`${prefix}-${name}`)
  }
  return { isRunning, addJob, removeJob }
}
