module.exports = (container) => {
  const { urlConfig: { cdcUrl }, httpCode } = container.resolve('config')
  const logger = container.resolve('logger')
  const accessToken = process.env.INTERNAL_TOKEN || '123'
  const axios = require('axios')

  const createGroup = async (body) => {
    try {
      const options = {
        headers: { 'x-access-token': accessToken },
        url: `${cdcUrl}/groups`,
        json: true,
        data: body,
        method: 'POST'
      }
      const { data } = await axios(options)
      return { statusCode: httpCode.SUCCESS, data }
    } catch (e) {
      const { name, statusCode, error } = e
      if (name === 'StatusCodeError') {
        return { data: error, statusCode, msg: (error || {}).msg || '' }
      }
      return { statusCode: httpCode.BAD_REQUEST, msg: '' }
    }
  }
  const updateGroup = async (id, body) => {
    try {
      const options = {
        headers: { 'x-access-token': accessToken },
        url: `${cdcUrl}/groups/${id}`,
        json: true,
        data: body,
        method: 'PUT'
      }
      const { data } = await axios(options)
      return { statusCode: httpCode.SUCCESS, data }
    } catch (e) {
      const { name, statusCode, error } = e
      if (name === 'StatusCodeError') {
        return { data: error, statusCode, msg: (error || {}).msg || '' }
      }
      return { statusCode: httpCode.BAD_REQUEST, msg: '' }
    }
  }
  const deleteGroup = async (id) => {
    try {
      const options = {
        headers: { 'x-access-token': accessToken },
        url: `${cdcUrl}/groups/${id}`,
        json: true,
        method: 'DELETE'
      }
      const { data } = await axios(options)
      return { statusCode: httpCode.SUCCESS, data }
    } catch (e) {
      const { name, statusCode, error } = e
      if (name === 'StatusCodeError') {
        return { data: error, statusCode, msg: (error || {}).msg || '' }
      }
      return { statusCode: httpCode.BAD_REQUEST, msg: '' }
    }
  }
  return {
    createGroup,
    updateGroup,
    deleteGroup
  }
}
