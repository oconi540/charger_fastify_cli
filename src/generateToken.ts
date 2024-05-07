import { FastifyRequest as Request, FastifyReply as Reply } from 'fastify';
import knexConfig from '../knexfile';
import knex from 'knex';

const knexInstance = knex(knexConfig.development);

async function verifyCredentials(id: number, secret: string): Promise<boolean> {
    const company = await knexInstance('company').where({ id, secret }).first();
    return !!company;
}
export const generateToken = async function generateToken(request: Request, reply: Reply): Promise<void> {
    try {

        const { id, secret } = request.body as { id: number; secret: string };

        if (!id || !secret) {
            reply.code(400).send({ error: 'Verifica el id y el secret son obligatorios.' });
        }

        const isValid = await verifyCredentials(id, secret);

        if (!isValid) {
            reply.code(400).send({ error: 'Credenciales inválidas. Verifica el id y el secret proporcionados.' });
        }

    } catch (error) {
        console.error('Error', error);
        reply.code(500).send({ message: 'Internal server error' });
    }
}

