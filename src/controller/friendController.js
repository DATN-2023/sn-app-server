module.exports = (container) => {
  const logger = container.resolve('logger')
  const { httpCode, serverHelper } = container.resolve('config')
  const { userRepo } = container.resolve('repo')

  const createFriend = async (req, res) => {
    try {
      const { _id } = req.userToken
      const body = req.body
      body.sender = _id
      const { statusCode, data, msg } = await userRepo.createFriend(body)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(httpCode.BAD_REQUEST).json(msg)
      }
      res.status(statusCode).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const updateFriend = async (req, res) => {
    try {
      // const { _id } = req.userToken
      const { id } = req.params
      const body = req.body
      // body.createdBy = _id
      const { statusCode, data, msg } = await userRepo.updateFriend(id, body)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(httpCode.BAD_REQUEST).json(msg)
      }
      res.status(statusCode).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const deleteFriend = async (req, res) => {
    try {
      const { id } = req.params
      const { statusCode, data, msg } = await userRepo.deleteFriend(id)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(httpCode.BAD_REQUEST).json(msg)
      }
      res.status(statusCode).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const getFriend = async (req, res) => {
    try {
      const { _id } = req.userToken
      const query = req.query
      const { statusCode, data, msg } = await userRepo.getFriend(query)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(statusCode).json({ msg })
      }
      return res.status(httpCode.SUCCESS).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const getFriendById = async (req, res) => {
    try {
      const { id } = req.params
      const { statusCode, data, msg } = await userRepo.getFriendById(id)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(statusCode).json({ msg })
      }
      return res.status(httpCode.SUCCESS).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  return {
    createFriend,
    updateFriend,
    deleteFriend,
    getFriendById,
    getFriend
  }
}
