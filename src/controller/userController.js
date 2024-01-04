module.exports = (container) => {
  const logger = container.resolve('logger')
  const { httpCode, serverHelper } = container.resolve('config')
  const { userRepo } = container.resolve('repo')

  const createUser = async (req, res) => {
    try {
      const { _id, avatar } = req.userToken
      const body = req.body
      body.customerId = _id
      body.avatar = avatar
      const { statusCode, data, msg } = await userRepo.createUser(body)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(httpCode.BAD_REQUEST).json(msg)
      }
      res.status(statusCode).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const updateUser = async (req, res) => {
    try {
      const { id } = req.params
      const body = req.body
      const { statusCode, data, msg } = await userRepo.updateUser(id, body)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(httpCode.BAD_REQUEST).json(msg)
      }
      res.status(statusCode).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const deleteUser = async (req, res) => {
    try {
      const { id } = req.params
      const { statusCode, data, msg } = await userRepo.deleteUser(id)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(httpCode.BAD_REQUEST).json(msg)
      }
      res.status(statusCode).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const getUser = async (req, res) => {
    try {
      const { _id } = req.userToken
      const query = req.query
      const { statusCode, data, msg } = await userRepo.getUser(query)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(statusCode).json({ msg })
      }
      return res.status(httpCode.SUCCESS).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const getUserById = async (req, res) => {
    try {
      const { id } = req.params
      const { _id } = req.userToken
      const query = { userId: _id }
      const { statusCode, data, msg } = await userRepo.getUserById({ id, query })
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(statusCode).json({ msg })
      }
      if (_id === data.customerId) data.isMe = 1
      else data.isMe = 0
      return res.status(httpCode.SUCCESS).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const getMe = async (req, res) => {
    try {
      // const { id } = req.params
      const { _id } = req.userToken
      const query = { userId: _id }
      const { statusCode, data, msg } = await userRepo.getUserById({ id: _id, query })
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(statusCode).json({ msg })
      }
      data.isMe = 1
      return res.status(httpCode.SUCCESS).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  return {
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    getUser,
    getMe
  }
}
