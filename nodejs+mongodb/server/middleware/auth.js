module.exports = options => {
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../models/AdminUser')

  return async (req, res, next) => {
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 401, 'sign up first')
    const {
      id
    } = jwt.verify(token, req.app.get('secret'))
    assert(id, 401, 'sign up first')
    req.user = await AdminUser.findById(id)
    assert(req.user, 401, 'sign up first')
    await next()
  }
}