const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
  
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error('Authentication failed!');
    }
    const payload = jwt.verify(token, 'supersecret_dont_share');
    req.currentUser = payload;
    next();
  } catch (err) {
    const error = new HttpError('Authentication failed!', 403);
    return next(error);
  }
};
