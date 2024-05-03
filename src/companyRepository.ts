import knexConfig from '../knexfile';
import knex from 'knex';
import { Company } from './companyModel';

const knexInstance = knex(knexConfig.development);

export interface CompanyRepository {
    getCompaniesSortedBy(sortBy: string): Promise<Company[]>;
}

export class KnexCompanyRepository implements CompanyRepository {
    async getCompaniesSortedBy(sortBy?: string): Promise<Company[]> {
        if (sortBy === undefined) {
            const companies = await knexInstance('company');
            if (companies.length === 0) {
                throw new Error('No hay compañías');
            }
            return companies;
        }

        if (sortBy === 'employees') {
            return knexInstance('company').select('*').orderBy('employees_count', 'desc');
        }

        if (sortBy === 'year') {
            return knexInstance('company').select('*').orderBy('founded_year', 'asc');
        }

        throw new Error('sortBy no válido');
    }
}
