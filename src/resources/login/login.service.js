const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const { User } = require('../users/user.model');
const { FORBIDDEN_ERROR } = require('../../errors/appError');
const { checkPass } = require('../../utils/hashHelper');

const signToken = async (login, password) => {
  const user = await User.findOne({ login });
  if (!user) throw new FORBIDDEN_ERROR('Wrong login/password');

  const { password: hashPassword } = user;
  const comparRes = await checkPass(password, hashPassword);
  if (!comparRes) throw new FORBIDDEN_ERROR('Wrong login/password');

  const { id } = user;
  const token = jwt.sign({ id, login }, JWT_SECRET_KEY, {
    expiresIn: '10min'
  });
  return token;
};

module.exports = {
  signToken
};
