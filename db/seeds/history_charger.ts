import { Knex } from 'knex';

export async function seed(knex: Knex){
    await knex('history_charger').del();
    await knex('history_charger').insert([
        {user_id: 1, user_name: 'John Doe', charger: 'Type A', start_date: '2024-04-01', end_date: '2024-04-30', status: 'Active',
            Consumption: 'Consumption', Cost: 'Cost', duration: 43200},
        {user_id: 2, user_name: 'Jane Smith', charger: 'Type B', start_date: '2024-03-15', end_date: '2024-04-30', status: 'Inactive',
            Consumption: 'Consumption', Cost: 'Cost', duration: 37800},
        {user_id: 3, user_name: 'Alice Johnson', charger: 'Type C', start_date: '2024-04-10', end_date: '2024-04-25', status: 'Active',
            Consumption: 'Consumption', Cost: 'Cost', duration: 21600},
    ]);
}
