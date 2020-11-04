const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');
const { User } = require('../resources/users/user.model');
const { FORBIDDEN_ERROR } = require('../errors/appError');

const signToken = (login, password) => {
  const user = User.findOne({ login, password });
  if (!user) {
    throw new FORBIDDEN_ERROR('signToken', { login, password });
  } else {
    const { id } = user;
    const token = jwt.sign({ id, login }, JWT_SECRET_KEY, {
      expiresIn: '10min'
    });
    return token;
  }
};

module.exports = {
  signToken
};
