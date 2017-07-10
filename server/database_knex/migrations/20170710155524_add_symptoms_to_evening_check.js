exports.up = function(knex, Promise) {
  return knex.schema.table('evening_check', table => {
    table.string('symptoms');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('evening_check', table => {
    table.dropColumn('symptoms');
  });
