const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
 
  if (req.method === 'OPTIONS') {
    return next();
  }
  if(!req.session || !req.session.jwt) {
    return next();
}
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY);
   
    req.currentUser = payload;
  
  } catch (err) {}
  next();
};
