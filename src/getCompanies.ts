import { FastifyRequest as Request, FastifyReply as Reply } from 'fastify';
import knexConfig from '../knexfile';
import knex from 'knex';

const knexInstance = knex(knexConfig.development);

export const getCompanies = async function getCompanies(request: Request, reply: Reply): Promise<void> {
    try {
        const { order_by } = request.query as { order_by: string };

        if (order_by === '') {
            reply.code(400).send({ error: 'order_by no puede ser vacío' });
        }

        if (order_by !== undefined && order_by !== 'employees' && order_by !== 'year') {
            reply.code(400).send({ error: 'order_by no válido' });
        }

        let companies;

        if (order_by === undefined) {
            companies = await knexInstance('company');
            if (companies.length === 0) {
                reply.code(200).send({ estado: 'No hay compañías' });
            }
            reply.send({ data: companies });
        }

        if (order_by === 'employees') {
            companies = await knexInstance('company').select('*').orderBy('employees_count', 'desc');
            reply.send({ data: companies });
        }

        if (order_by === 'year') {
            companies = await knexInstance('company').select('*').orderBy('founded_year', 'asc');
            reply.send({ data: companies });
        }

    } catch (error) {
        console.error('Error fetching companies:', error);
        reply.code(500).send({ message: 'Internal server error' });
    }
}
