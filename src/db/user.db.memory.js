const taskService = require('./task.db.memory');
const DBmain = require('./inMemoryDb');
const DB = DBmain.DBUsers;
const { logger } = require('../handler/logger');

const getAllUsers = async () => {
  try {
    return DB.slice(0);
  } catch (error) {
    logger.log('error', error.message);
  }
};

const getUser = async id => {
  try {
    const user = DB.filter(el => el.id === id)[0];
    return user;
  } catch (error) {
    logger.log('error', error.message);
  }
};

const createUser = async user => {
  try {
    DB.push(user);
    return user;
  } catch (error) {
    logger.log('error', error.message);
  }
};

const updateUser = async (id, userBody) => {
  try {
    const user = await getUser(id);
    // DB.filter(el => el.id === id)[0].name = userBody.name;
    // DB.filter(el => el.id === id)[0].login = userBody.login;
    // DB.filter(el => el.id === id)[0].password = userBody.password;

    if (!user) return null;
    for (const [key, value] of Object.entries(userBody)) {
      user[key] = value;
    }
    DB[id] = user;
    return user;
  } catch (error) {
    logger.log('error', error.message);
  }
};

const deleteUser = async id => {
  try {
    const user = await getUser(id);
    if (!user) return null;

    const index = DB.indexOf(user);
    if (index < 0) {
      throw new Error('User not found');
      //   return false;
    }

    // When somebody DELETE User, all Tasks where User is assignee should be updated to put userId=null.
    await taskService.usersToNull(user.id);

    DB.splice(index, 1);
    return true;
  } catch (error) {
    logger.log('error', error.message);
  }
};

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };
