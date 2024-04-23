import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('charger', function (table) {
        table.increments('id').primary();
        table.string('alias').notNullable();
        table.string('model').notNullable();
        table.string('serialNumber').notNullable().unique();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('charger');
}
