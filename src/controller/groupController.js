module.exports = (container) => {
  const logger = container.resolve('logger')
  const { httpCode, serverHelper } = container.resolve('config')
  const { groupRepo } = container.resolve('repo')

  const createGroup = async (req, res) => {
    try {
      const { _id } = req.userToken
      const body = req.body
      body.createdBy = _id
      const { statusCode, data, msg } = await groupRepo.createGroup(body)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(httpCode.BAD_REQUEST).json(msg)
      }
      res.status(statusCode).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const updateGroup = async (req, res) => {
    try {
      const { id } = req.params
      const body = req.body
      const { statusCode, data, msg } = await groupRepo.updateGroup(id, body)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(httpCode.BAD_REQUEST).json(msg)
      }
      res.status(statusCode).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const deleteGroup = async (req, res) => {
    try {
      const { id } = req.params
      const { statusCode, data, msg } = await groupRepo.deleteGroup(id)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(httpCode.BAD_REQUEST).json(msg)
      }
      res.status(statusCode).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const getGroup = async (req, res) => {
    try {
      const { _id } = req.userToken
      const query = req.query
      const { statusCode, data, msg } = await groupRepo.getGroup(query)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(statusCode).json({ msg })
      }
      return res.status(httpCode.SUCCESS).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const getGroupById = async (req, res) => {
    try {
      const { id } = req.params
      const { statusCode, data, msg } = await groupRepo.getGroupById(id)
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
    createGroup,
    updateGroup,
    deleteGroup,
    getGroupById,
    getGroup
  }
}
