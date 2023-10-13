module.exports = container => {
  const { handleCacheOnRepo } = container.resolve('handleCache')
  const { testHelper } = container.resolve('helper')

  const get = async (q) => {
    const faqKey = `getFaq-${q.constructor === Object ? JSON.stringify(q) : q}`
    return await handleCacheOnRepo(faqKey, testHelper.get, q)
  }
  const getById = async (id) => {
    const faqKey = `getFaqById-${id}`
    return await handleCacheOnRepo(faqKey, testHelper.get, id)
  }
  return {
    get,
    getById
  }
}
