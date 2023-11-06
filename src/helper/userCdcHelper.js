const axios = require('axios')
module.exports = (container) => {
  const { urlConfig: { cdcUrl }, httpCode } = container.resolve('config')
  const logger = container.resolve('logger')
  const accessToken = process.env.INTERNAL_TOKEN || '123'
  const axios = require('axios')

  const createUser = async (body) => {
    try {
      const options = {
        headers: { 'x-access-token': accessToken },
        url: `${cdcUrl}/users`,
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
  const updateUser = async (id, body) => {
    try {
      const options = {
        headers: { 'x-access-token': accessToken },
        url: `${cdcUrl}/users/${id}`,
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
  const deleteUser = async (id, body) => {
    try {
      const options = {
        headers: { 'x-access-token': accessToken },
        url: `${cdcUrl}/users/${id}`,
        json: true,
        method: 'DELETE',
        data: body
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
  const createFriend = async (body) => {
    try {
      const options = {
        headers: { 'x-access-token': accessToken },
        url: `${cdcUrl}/friends`,
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
  const updateFriend = async (id, body) => {
    try {
      const options = {
        headers: { 'x-access-token': accessToken },
        url: `${cdcUrl}/friends/${id}`,
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
  const deleteFriend = async (id, body) => {
    try {
      const options = {
        headers: { 'x-access-token': accessToken },
        url: `${cdcUrl}/friends/${id}`,
        json: true,
        method: 'DELETE',
        data: body
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
    createUser,
    updateUser,
    deleteUser,
    createFriend,
    updateFriend,
    deleteFriend
  }
}
