import { Knex } from 'knex';
export async function seed(knex: Knex){
    await knex('companies_list').del();
    await knex('companies_list').insert([
        {company_id: 1, name: 'Tesla Inc.', founded_year: 2003, revenue: 4680.00, employees_count: 70000},
        {company_id: 2, name: 'Apple Inc.', founded_year: 1976, revenue: 365.00, employees_count: 154000},
        {company_id: 3, name: 'Google LLC', founded_year: 1998, revenue: 2000.00, employees_count: 150000},
    ]);
}