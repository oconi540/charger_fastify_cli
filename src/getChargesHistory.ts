import { FastifyRequest as Request, FastifyReply as Reply } from 'fastify';
import knexConfig from '../knexfile';
import knex from 'knex';

const knexInstance = knex(knexConfig.development);

async function getChargesHistory(request: Request, reply: Reply): Promise<void> {
    try {
        const charges = await knexInstance('charges_history');

        if (charges.length > 0) {
            charges.forEach(charges => {
                const startDate = new Date(charges.start_date);
                const endDate = new Date(charges.end_date);
                const durationInMilliseconds = endDate.getTime() - startDate.getTime();
                const durationInMinutes = durationInMilliseconds / (1000 * 60);
                charges.duration = durationInMinutes;
            });

            reply.send({
                data: charges,
            });
        } else {
            reply.code(404).send({
                message: 'No charges found',
                success: false,
            });
        }
    } catch (error) {
        console.error('Error fetching chargers:', error);
        reply.code(500).send({
            message: 'Internal server error',
            success: false,
        });
    }
}

export default getChargesHistory;