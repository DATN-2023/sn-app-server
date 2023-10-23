const serverSettings = {
  port: process.env.PORT || 8000,
  basePath: process.env.BASE_PATH || ''
}

const httpCode = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  TOKEN_EXPIRED: 409,
  UNKNOWN_ERROR: 520,
  FORBIDDEN: 403,
  ADMIN_REQUIRE: 406,
  SIGNATURE_ERROR: 411,
  UNAUTHORIZED: 401,
  USER_BLOCK: 412,
  DEVICE_BLOCK: 413
}

const dbSettings = {
  db: process.env.DB || 'hddt-customer',
  user: process.env.DB_USER || '',
  pass: process.env.DB_PASS || '',
  repl: process.env.DB_REPLS || '',
  servers: (process.env.DB_SERVERS) ? process.env.DB_SERVERS.split(',') : [
    'localhost:27017'
  ]
}
const serverHelper = function () {
  const jwt = require('jsonwebtoken')
  const crypto = require('crypto')
  const secretKey = process.env.SECRET_KEY || '112customer#$!@!'

  function decodeToken (token) {
    return jwt.decode(token)
  }

  function genToken (obj) {
    return jwt.sign(obj, secretKey, { expiresIn: '1d' })
  }

  function verifyToken (token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secretKey, (err, decoded) => {
        err ? reject(new Error(err)) : resolve(decoded)
      })
    })
  }

  function encryptPassword (password) {
    return crypto.createHash('sha256').update(password, 'binary').digest('base64')
  }

  const handleDataBeforeCache = (data) => {
    return {
      data: data instanceof String ? JSON.parse(data) : data, dateCreated: Date.now() / 1000
    }
  }
  const isTrustCacheData = ({ data, dateCreated }) => {
    const now = Date.now() / 1000
    if (Math.abs(now - dateCreated) <= redisConfig.expire) {
      return data
    } else {
      return null
    }
  }

  return { decodeToken, encryptPassword, verifyToken, genToken, handleDataBeforeCache, isTrustCacheData }
}

const eventConfig = {
  EMPLOYEE_UPDATE: 'EMPLOYEE_UPDATE', ADD_JOB: 'ADD_JOB', STOP_JOB: 'STOP_JOB', UPDATE_CACHE: 'UPDATE_CACHE'
}

const redisConfig = {
  sentinel: process.env.REDIS_SENTINEL || '',
  clusterName: process.env.REDIS_CLUSTER_NAME || '',
  clusterPassword: process.env.REDIS_CLUSTER_PASSWORD || '',
  db: process.env.REDIS_DB || 5,
  port: process.env.REDIS_PORT || 6379, // Redis port
  host: process.env.REDIS_HOST || 'localhost', // Redis host
  uri: process.env.REDIS_URI || '', // host: process.env.REDIS_HOST || '127.0.0.1', // Redis host
  expire: +process.env.EXPIRE_CACHE_SECOND || 10,
  expireSearch: process.env.EXPIRE_SEARCH || 24 * 7 * 60 * 60
}

const urlConfig = {
  cdcUrl: process.env.CDC_URL || 'http://localhost:8002',
  sdpUrl: process.env.SDP_URL || 'http://localhost:8001',
  customerUrl: process.env.CUSTOMER_URL || 'http://localhost:8005',
}
module.exports = { dbSettings, serverHelper: serverHelper(), serverSettings, httpCode, redisConfig, urlConfig, eventConfig }
