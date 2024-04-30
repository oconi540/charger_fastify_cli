import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.renameTable('companies_list', 'company');
    await knex.schema.alterTable('company', (table) => {
        table.renameColumn('company_id', 'id');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('company', (table) => {
        table.renameColumn('id', 'company_id');
    });
    await knex.schema.renameTable('company', 'companies_list');
}


