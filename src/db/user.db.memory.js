const taskService = require('./task.db.memory');
const DBmain = require('./inMemoryDb');
const DB = DBmain.DBUsers;

const getAllUsers = async () => DB.slice(0);

const getUser = async id => {
  try {
    const user = DB.filter(el => el.id === id)[0];
    return user;
  } catch (error) {
    console.log(error.nessage);
  }
};

const createUser = async user => {
  try {
    DB.push(user);
    return user;
  } catch (error) {
    console.loig(error.message);
  }
};
const updateUser = async (id, user) => {
  DB.filter(el => el.id === id)[0].name = user.name;
  DB.filter(el => el.id === id)[0].login = user.login;
  DB.filter(el => el.id === id)[0].password = user.password;
  return getUser(id);
};

const deleteUser = async id => {
  try {
    const user = await getUser(id);
    const index = DB.indexOf(user);
    if (index < 0) {
      throw new Error('User not found');
    }

    // When somebody DELETE User, all Tasks where User is assignee should be updated to put userId=null.
    await taskService.usersToNull(user.id);

    DB.splice(index, 1);
    return true;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };
