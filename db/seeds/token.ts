import { Knex } from 'knex';
export async function seed(knex: Knex){
    await knex('token').del();
    await knex('token').insert([
        {access_token:'', expires_in: new Date(), refresh_token: '', company_id: 1},
    ]);
}