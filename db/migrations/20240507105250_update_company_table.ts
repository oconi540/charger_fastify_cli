import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('company', function (table) {
        table.string('secret').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('company', function (table) {
        table.dropColumn('secret');
    });
}
