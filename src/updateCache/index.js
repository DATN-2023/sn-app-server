module.exports = container => {
  const redisHelper = container.resolve('redisHelper')
  const logger = container.resolve('logger')
  const mediator = container.resolve('mediator')
  const { serverHelper, eventConfig } = container.resolve('config')
  const { jobRepo } = container.resolve('repo')

  async function updateCache (key, func, args, standardization) {
    try {
      await jobRepo.addJob(key)
      const data = await func(...args)
      if (data.statusCode >= 200 && data.statusCode < 400) {
        await redisHelper.set(key, JSON.stringify(serverHelper.handleDataBeforeCache(standardization(data))))
        await jobRepo.removeJob(key)
      } else {
        console.log('hmmmm', data.statusCode)
      }
      await jobRepo.removeJob(key)
    } catch (e) {
      await jobRepo.removeJob(key)
      logger.e(e)
    }
  }


  mediator.on(eventConfig.UPDATE_CACHE, ([key, func, args, standardization]) => {
    setTimeout(async () => {
      if (!standardization) {
        standardization = data => data
      }
      const isRunning = await jobRepo.isRunning(key)
      if (!isRunning) {
        console.log('update', key)
        await updateCache(key, func, args, standardization)
      }
    }, 1)
  })
}
