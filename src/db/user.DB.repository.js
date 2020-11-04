const { User } = require('../resources/users/user.model');
const { NOT_FOUND_ERROR } = require('../errors/appError');
const ENTITY_NAME = 'user';
const taskRepository = require('./task.DB.repository');

const getAll = async () => User.find({});

const create = async user => User.create(user);

const get = async id => {
  const user = await User.findById(id);
  // const user = await User.findOne({ _id: id });
  if (!user) throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  return user;
};

const update = async (id, user) => {
  const searchUser = await User.findById(id);
  if (!searchUser) throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  await User.updateOne({ _id: id }, user);
  return get(id);
};

const remove = async id => {
  const user = await User.findById(id);
  if (!user) throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  // When somebody DELETE User,
  // all Tasks where User is assignee should be updated to put userId=null.
  taskRepository.usersToNull(id);

  return User.findByIdAndDelete(id);
};

module.exports = { getAll, create, get, remove, update };
