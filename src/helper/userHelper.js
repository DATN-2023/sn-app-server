const axios = require('axios').default
module.exports = container => {
  const { urlConfig, httpCode } = container.resolve('config')

  async function getUserDetail (token) {
    try {
      const { data } = await axios.get(`${urlConfig.customer}/detailCache`, {
        headers: {
          'x-access-token': token
        }
      })
      return { statusCode: httpCode.SUCCESS, data }
    } catch (error) {
      return { statusCode: httpCode.TOKEN_EXPIRED }
    }
  }

  return { getUserDetail }
}
