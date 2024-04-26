import { Knex } from 'knex';

export async function seed(knex: Knex){
    await knex('charges_history').del();
    await knex('charges_history').insert([
        {user_id: 1, user_name: 'John Doe', charger: 'Type A', start_date: '2024-04-01', end_date: '2024-04-30', status: 'Active',
            consumption: 1000},
        {user_id: 2, user_name: 'Jane Smith', charger: 'Type B', start_date: '2024-03-15', end_date: '2024-04-30', status: 'Inactive',
            consumption: 1500},
        {user_id: 3, user_name: 'Alice Johnson', charger: 'Type C', start_date: '2024-04-10', end_date: '2024-04-25', status: 'Active',
            consumption: 2000},
    ]);
}
