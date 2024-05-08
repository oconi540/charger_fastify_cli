import knexConfig from '../knexfile';
import knex from 'knex';
import { Company } from './companyModel';

const knexInstance = knex(knexConfig.development);

export interface CompanyRepository {
    getCompaniesSortedBy(sortBy: string): Promise<Company[]>;
}

export class KnexCompanyRepository implements CompanyRepository {
    async getCompaniesSortedBy(sortBy?: string, sortDirection?: string): Promise<Company[]> {
        if (sortBy === 'employees') {
            return knexInstance('company').select('*').orderBy('employees_count', sortDirection);
        }

        if (sortBy === 'year') {
            return knexInstance('company').select('*').orderBy('founded_year', sortDirection);
        }

        if (sortBy === undefined) {
            return knexInstance('company');
        }

        throw new Error('sortBy no válido');
    }

    async findByCredentials(id: number, secret: string) {
        return knexInstance('company').where({ id, secret }).first();
    }
}
