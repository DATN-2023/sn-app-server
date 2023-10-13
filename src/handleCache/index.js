module.exports = container => {
  const redisHelper = container.resolve('redisHelper')
  const logger = container.resolve('logger')
  const mediator = container.resolve('mediator')
  const { serverHelper, eventConfig } = container.resolve('config')

  const handleCacheOnRepo = async (key, func, args = {}) => {
    let value = await redisHelper.get(key)
    if (value) {
      value = JSON.parse(value)
      if (serverHelper.isTrustCacheData(value)) {
        return value.data
      } else {
        logger.d('updated cache', key)
        mediator.emit(eventConfig.UPDATE_CACHE, [key, func, [args]])
        return value.data
      }
    }
    value = await func(args)
    redisHelper.set(key, JSON.stringify(serverHelper.handleDataBeforeCache(value)))
    return value
  }

  return {
    handleCacheOnRepo
  }
}
