module.exports = container => {
  const { handleCacheOnRepo } = container.resolve('handleCache')
  const { notificationSdpHelper } = container.resolve('helper')

  const getNotification = async (q) => {
    // const key = `getNotification-${q.constructor === Object ? JSON.stringify(q) : q}`
    // return handleCacheOnRepo(key, notificationSdpHelper.getNotification, q)
    return notificationSdpHelper.getNotification(q)
  }
  const getNotificationById = async (id) => {
    const key = `getNotificationById-${id}`
    return handleCacheOnRepo(key, notificationSdpHelper.getNotificationById, id)
  }

  return {
    getNotification,
    getNotificationById
  }
}
