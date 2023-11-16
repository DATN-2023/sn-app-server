module.exports = (container) => {
  const logger = container.resolve('logger')
  const { httpCode, serverHelper } = container.resolve('config')
  const { userGroupRepo } = container.resolve('repo')

  const createUserGroup = async (req, res) => {
    try {
      const { _id } = req.userToken
      const body = req.body
      body.createdBy = _id
      const { statusCode, data, msg } = await userGroupRepo.createUserGroup(body)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(httpCode.BAD_REQUEST).json(msg)
      }
      res.status(statusCode).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const updateUserGroup = async (req, res) => {
    try {
      const { id } = req.params
      const body = req.body
      const { statusCode, data, msg } = await userGroupRepo.updateUserGroup(id, body)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(httpCode.BAD_REQUEST).json(msg)
      }
      res.status(statusCode).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const deleteUserGroup = async (req, res) => {
    try {
      const { id } = req.params
      const { statusCode, data, msg } = await userGroupRepo.deleteUserGroup(id)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(httpCode.BAD_REQUEST).json(msg)
      }
      res.status(statusCode).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const getUserGroup = async (req, res) => {
    try {
      const { _id } = req.userToken
      const query = req.query
      const { statusCode, data, msg } = await userGroupRepo.getUserGroup(query)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(statusCode).json({ msg })
      }
      return res.status(httpCode.SUCCESS).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const getUserGroupById = async (req, res) => {
    try {
      const { id } = req.params
      const { statusCode, data, msg } = await userGroupRepo.getUserGroupById(id)
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
    createUserGroup,
    updateUserGroup,
    deleteUserGroup,
    getUserGroupById,
    getUserGroup
  }
}
