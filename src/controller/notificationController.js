module.exports = (container) => {
  const logger = container.resolve('logger')
  const { httpCode, serverHelper } = container.resolve('config')
  const { notificationRepo } = container.resolve('repo')

  const getNotification = async (req, res) => {
    try {
      const { _id } = req.userToken
      const query = req.query
      query.alertUser = _id
      const { statusCode, data, msg } = await notificationRepo.getNotification(query)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(statusCode).json({ msg })
      }
      return res.status(httpCode.SUCCESS).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const getNotificationById = async (req, res) => {
    try {
      const { id } = req.params
      const { statusCode, data, msg } = await notificationRepo.getNotificationById(id)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(statusCode).json({ msg })
      }
      return res.status(httpCode.SUCCESS).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const updateNotification = async (req, res) => {
    try {
      const { id } = req.params
      const body = req.body
      const { statusCode, data, msg } = await notificationRepo.updateNotification(id, body)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(httpCode.BAD_REQUEST).json(msg)
      }
      res.status(statusCode).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  return {
    getNotificationById,
    getNotification,
    updateNotification
  }
}
