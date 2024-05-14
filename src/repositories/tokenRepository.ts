import knexConfig from '../../knexfile';
import knex from 'knex';
import { Token } from '../models/tokenModel';

const knexInstance = knex(knexConfig.development);

export interface tokenRepository {
    insertToken(token: Token): Promise<void>;
    validateRefreshToken(companyId: number, refreshToken: string): Promise<boolean>;
}

export class KnexTokenRepository implements tokenRepository {
    async insertToken(token: Token): Promise<void> {
        await knexInstance('token').insert(token);
    }

    async validateRefreshToken(companyId: number, refreshToken: string): Promise<boolean> {
        const token = await knexInstance('token')
            .where({
                company_id: companyId,
                refresh_token: refreshToken
            })
            .first();
        return !!token;
    }
}