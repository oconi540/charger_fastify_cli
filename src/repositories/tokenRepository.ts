import knexConfig from '../../knexfile';
import knex from 'knex';
import { Token } from '../models/tokenModel';

const knexInstance = knex(knexConfig.development);

export interface tokenRepository {
    insertToken(token: Token): Promise<void>;
}

export class KnexTokenRepository implements tokenRepository {
    async insertToken(token: Token): Promise<void> {
        await knexInstance('token').insert(token);
    }
}