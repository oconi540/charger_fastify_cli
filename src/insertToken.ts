import { FastifyRequest as Request, FastifyReply as Reply } from 'fastify';
import knexConfig from '../knexfile';
import knex from 'knex';

const knexInstance = knex(knexConfig.development);

export async function insertToken(request: Request, reply: Reply): Promise<void> {
    const { id, secret } = request.body as { id: string; secret: string };

    try {
        if (!id || !secret) {
            reply.code(400).send({ error: 'Verifica el id y el secret son obligatorios.' });
        }

        const isValid = await verifyToken(parseInt(id), secret);

        if (!isValid) {
            reply.code(400).send({ error: 'Credenciales inválidas. Verifica el id y el secret proporcionados.' });
        }

        const accessToken: string = accessRefreshToken();
        const refreshToken: string = accessRefreshToken();
        const currentDate = new Date();
        const expiresIn = new Date(currentDate.getTime() + (7 * 24 * 60 * 60 * 1000));

        await knexInstance('token').insert({
            access_token: accessToken,
            expires_in: expiresIn,
            refresh_token: refreshToken,
            company_id: id
        });

        reply.code(200).send({
            access_token: accessToken,
            expires_in: expiresIn,
            refresh_token: refreshToken
        });
    } catch (error) {
        reply.code(500).send({ message: 'Internal server error' });
    }
}

function accessRefreshToken(): string {
    const currentTime: string = new Date().getTime().toString();
    const randomValue: string = Math.floor(Math.random() * 10000).toString();
    return currentTime + randomValue;
}

async function verifyToken(id: number, secret: string): Promise<boolean> {
    const company = await knexInstance('company').where({ id, secret }).first();
    return !!company;
}
