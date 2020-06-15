exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex('users')
    .truncate()
    .then(function () {
      return knex('users').insert([
        { username: 'Sam', password: '123' },
        { username: 'Mike', password: '123' },
        { username: 'Smith', password: '123' },
        { username: 'Jason', password: '123' },
      ]);
    });
};
