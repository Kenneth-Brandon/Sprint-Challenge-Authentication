const cryptZ = require('bcryptjs');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'jon', password: cryptZ.hashSync('quimble', 12) },
        { username: 'eyyy', password: cryptZ.hashSync('quimble', 12) },
        { username: 'quimb', password: cryptZ.hashSync('quimble', 12) },
        { username: 'bimb', password: cryptZ.hashSync('quimble', 12) },
      ]);
    });
};
