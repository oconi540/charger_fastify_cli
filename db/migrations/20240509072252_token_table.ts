import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('token', function (table) {
        table.string('access_token').notNullable();
        table.timestamp('expires_in').notNullable();
        table.string('refresh_token').notNullable();
        table.integer('company_id').unsigned().references('id').inTable('company').onDelete('CASCADE');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('token');
}


