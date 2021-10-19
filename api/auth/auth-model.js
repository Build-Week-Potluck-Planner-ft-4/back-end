const db = require('../../data/db-config')

async function insertUser(user) {
    const [newUserObject] = await db('users')
      .insert(user, ['user_id', 'username', 'email', 'password'])
    return newUserObject // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
  }

  function findBy(filter) {
      return db('users')
        .select('username', 'email', 'password')
        .where(filter)
  }

  function getById(id) {
    return db('users')
      .where('user_id', id)
      .first()
  }

  module.exports = {
      insertUser,
      findBy,
      getById
  }