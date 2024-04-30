import { FastifyRequest as Request, FastifyReply as Reply } from 'fastify';
import knexConfig from '../knexfile';
import knex from 'knex';

const knexInstance = knex(knexConfig.development);

export const getCompanies = async function getCompanies(request: Request, reply: Reply): Promise<void> {
    try {
        const companies = await knexInstance('company');

        if (companies.length > 0) {
            reply.send({ data: companies });
        } else {
            reply.code(200).send({  estado: 'No hay compañías' });
        }
    } catch (error) {
        console.error('Error fetching companies:', error);
        reply.code(500).send({ message: 'Internal server error' });
    }
}
