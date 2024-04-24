import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('charges_history', function (table) {
        table.increments('user_id').primary();
        table.string('user_name').notNullable();
        table.string('charger').notNullable();
        table.date('start_date').notNullable();
        table.date('end_date').notNullable();
        table.string('status').notNullable();
        table.string('Consumption').notNullable();
        table.string('Cost').notNullable();
        table.integer('duration').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('charges_history');
}

