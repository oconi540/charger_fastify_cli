import { FastifyRequest as Request, FastifyReply as Reply } from 'fastify';
import { KnexCompanyRepository } from './companyRepository';

export const getCompanies = async function getCompanies(request: Request, reply: Reply): Promise<void> {
    try {
        const { order_by} = request.query as { order_by: string };

        if (order_by === '') {
            reply.code(400).send({ error: 'order_by no puede ser vacío' });
        }

        if (order_by !== undefined && order_by !== 'employees' && order_by !== 'year') {
            reply.code(400).send({ error: 'order_by no válido' });
        }

        const companyRepository = new KnexCompanyRepository();

        let sortDirection = 'desc';
        if (order_by === 'year') {
            sortDirection = 'asc';
        }

        const companies = await companyRepository.getCompaniesSortedBy(order_by, sortDirection);
        reply.send({ data: companies });

        if (companies.length === 0) {
            reply.code(400).send({ error: 'No hay compañías' });
        }

    } catch (error) {
        console.error('Error fetching companies:', error);
        reply.code(500).send({ message: 'Internal server error' });
    }
};