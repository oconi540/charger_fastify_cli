import { FastifyRequest as Request, FastifyReply as Reply } from 'fastify';
import { KnexCompanyRepository } from './repositories/companyRepository';

export const getCompanies = async function getCompanies(request: Request, reply: Reply): Promise<void> {
    try {
        const { orderBy} = request.query as { orderBy: string };

        if (orderBy === '') {
            reply.code(400).send({ error: 'orderBy no puede ser vacío' });
        }

        if (orderBy !== undefined && orderBy !== 'employees' && orderBy !== 'year') {
            reply.code(400).send({ error: 'orderBy no válido' });
        }

        const companyRepository = new KnexCompanyRepository();

        let sortDirection = 'desc';
        if (orderBy === 'year') {
            sortDirection = 'asc';
        }

        const companies = await companyRepository.getCompaniesSortedBy(orderBy, sortDirection);
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