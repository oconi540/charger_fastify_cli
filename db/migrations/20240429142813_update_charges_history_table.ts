import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.table('charges_history', function (table) {
        table.dropColumn('Cost');
        table.dropColumn('duration');
    });
    await knex.schema.table('charges_history', function (table) {
        table.renameColumn('Consumption', 'consumption');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.table('charges_history', function (table) {
        table.string('Cost').notNullable();
        table.integer('duration').notNullable();

        table.renameColumn('consumption', 'Consumption');
    });
}


