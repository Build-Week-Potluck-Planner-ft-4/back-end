
exports.up = async function(knex) {
  await knex.schema.table('potluck', tbl => {
      tbl.integer('user_id')
        .notNullable()
        .unsigned()
        .references('user_id')
        .inTable('users')
  })
};

exports.down = async function(knex) {
  await knex.schema.table('potluck', tbl => {
      tbl.dropColumn('user_id')
  })
};
