const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const { UNAUTHORIZED_ERROR } = require('../../errors/appError');

const PATH_WHITELIST = ['/', '/login', '/doc'];

module.exports = (req, res, next) => {
  if (PATH_WHITELIST.includes(req.path)) return next();

  const authHeader = req.header('Authorization');

  if (authHeader !== undefined) {
    const tokenString = req.header('Authorization');

    const [type, token] = tokenString.split(' ');

    if (type !== 'Bearer') {
      throw new UNAUTHORIZED_ERROR();
    } else {
      try {
        res = jwt.verify(token, JWT_SECRET_KEY, {
          expiresIn: '10min'
        });
      } catch {
        throw new UNAUTHORIZED_ERROR();
      }
      return next();
    }
  }
  throw new UNAUTHORIZED_ERROR();
};
