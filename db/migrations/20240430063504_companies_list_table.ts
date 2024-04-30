import { Knex } from 'knex';
export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('companies_list', function (table) {
        table.increments('company_id').primary();
        table.string('name').notNullable();
        table.integer('founded_year').notNullable();
        table.decimal('revenue').notNullable();
        table.integer('employees_count').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('companies_list');
}

