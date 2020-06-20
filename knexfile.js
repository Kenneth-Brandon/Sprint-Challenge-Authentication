const pgConnection =
  process.env.DATABASE_URL ||
  'postgres://agulijecrvvuhk:e530156534f49a7b6a0374aa86921674b065765139535368d6a79ccbb02453a8@ec2-50-17-178-87.compute-1.amazonaws.com:5432/db56j7ts84o56u';

module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: './database/auth.db3' },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './database/seeds' },
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './database/testauth.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },
  production: {
    client: 'pg',
    connection: pgConnection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },
};
