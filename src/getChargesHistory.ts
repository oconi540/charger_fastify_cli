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

                let pricePerKWh = 0;
                switch (charges.charger) {
                    case 'Type A':
                        pricePerKWh = 0.15;
                        break;
                    case 'Type B':
                        pricePerKWh = 0.20;
                        break;
                    case 'Type C':
                        pricePerKWh = 0.25;
                        break;
                    default:
                        pricePerKWh = 0;
                }

                const totalCost = (charges.Consumption || 0) * pricePerKWh;
                charges.Cost = totalCost;

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