import { FastifyRequest as Request, FastifyReply as Reply } from 'fastify';
import knexConfig from '../knexfile';
import knex from 'knex';

const knexInstance = knex(knexConfig.development);

async function getHistoryCharger(request: Request, reply: Reply): Promise<void> {
    try {
        const chargers = await knexInstance('charges_history');

        if (chargers.length > 0) {
            chargers.forEach(charger => {
                const startDate = new Date(charger.start_date);
                const endDate = new Date(charger.end_date);
                const durationInMilliseconds = endDate.getTime() - startDate.getTime();
                const durationInMinutes = durationInMilliseconds / (1000 * 60);
                charger.duration = durationInMinutes;
            });

            reply.send({
                data: chargers,
            });
        } else {
            reply.code(404).send({
                message: 'No chargers found',
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

export default getHistoryCharger;