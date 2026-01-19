/**
 * @type {{ [key: string]: import('knex').Knex.Config }}
 */
export default {
  development: {
    client: 'better-sqlite3',
    connection: {
      filename: 'db/local.sqlite3'
    },
    migrations: {
      directory: 'db/migrations'
    }
  }
}
