const bcrypt = require('bcrypt');
const DEFAULT_SALT_ROUNDS = 10;

const hashPass = async password => {
  const salt = await bcrypt.genSalt(DEFAULT_SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const checkPass = async (password, hash) =>
  await bcrypt.compare(password, hash);

module.exports = {
  hashPass,
  checkPass
};
