import knexConfig from '../../knexfile';
import knex from 'knex';
import { Company } from '../models/companyModel';

const knexInstance = knex(knexConfig.development);

export interface companyRepository {
    getCompaniesSortedBy(sortBy: string): Promise<Company[]>;
    findCompanyByIdAndSecret(id: number, secret: string): Promise<Company | null>;
}

export class KnexCompanyRepository implements companyRepository {
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

    async findCompanyByIdAndSecret(id: number, secret: string): Promise<Company | null> {
        return knexInstance('company').where({ id, secret }).first();
    }
}