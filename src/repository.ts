import knexConfig from '../knexfile';
import knex from 'knex';
import { Company, Token } from './models';

const knexInstance = knex(knexConfig.development);

export interface Repository {
    getCompaniesSortedBy(sortBy: string): Promise<Company[]>;
    findCompanyByIdAndSecret(id: number, secret: string): Promise<Company | null>;
}

export class KnexRepository implements Repository {
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

    async insertToken(token: Token): Promise<void> {
        await knexInstance('token').insert(token);
    }
}
