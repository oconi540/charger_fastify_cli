import { FastifyRequest as Request, FastifyReply as Reply } from 'fastify';
import { KnexRepository } from './repository';

export const getCompanies = async function getCompanies(request: Request, reply: Reply): Promise<void> {
    try {
        const { orderBy} = request.query as { orderBy: string };

        if (orderBy === '') {
            reply.code(400).send({ error: 'orderBy no puede ser vacío' });
        }

        if (orderBy !== undefined && orderBy !== 'employees' && orderBy !== 'year') {
            reply.code(400).send({ error: 'orderBy no válido' });
        }

        const Repository = new KnexRepository();

        let sortDirection = 'desc';
        if (orderBy === 'year') {
            sortDirection = 'asc';
        }

        const companies = await Repository.getCompaniesSortedBy(orderBy, sortDirection);
        if (companies.length === 0) {
            reply.code(400).send({ error: 'No hay compañías' });
        } else {
            reply.send({ data: companies });
        }
    } catch (error) {
        console.error('Error fetching companies:', error);
        reply.code(500).send({ message: 'Internal server error' });
    }
};