const db = require('../database/dbConfig');

module.exports = {
  addUser,
  getUsers,
  getUserByUsername,
};

function addUser(credentials) {
  return db('users').insert(credentials);
}

function getUsers() {
  return db.select('*').from('users');
}

function getUserByUsername(username) {
  return db.select('*').from('users').where({ username });
}
