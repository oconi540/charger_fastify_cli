import { Knex } from 'knex';

export async function seed(knex: Knex){
  await knex('charger').del();
  await knex('charger').insert([
    {id: 1, alias: 'charger1', model: 'NW-T1', serialNumber: 1234567},
    {id: 2, alias: 'charger2', model: 'NW-T2', serialNumber: 2222222},
    {id: 3, alias: 'charger3', model: 'NW-T3', serialNumber: 3333333}
  ]);
}
