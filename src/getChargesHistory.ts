import { FastifyRequest as Request, FastifyReply as Reply } from 'fastify';
import knexConfig from '../knexfile';
import knex from 'knex';

const knexInstance = knex(knexConfig.development);

async function getChargesHistory(request: Request, reply: Reply): Promise<void> {
    try {
        const charges = await knexInstance('charges_history');

        if (charges.length > 0) {
            charges.forEach(charge => {
                charge.duration = calculateDuration(charge.start_date, charge.end_date);
                charge.cost = calculateCost(charge);
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

function calculateDuration(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return (end.getTime() - start.getTime()) / (1000 * 60);
}

function calculateCost(charge: any): number {
    let pricePerKWh = 0;

    if (charge.charger === 'Type A') {
        pricePerKWh = 0.15;
    } else if (charge.charger === 'Type B') {
        pricePerKWh = 0.20;
    } else if (charge.charger === 'Type C') {
        pricePerKWh = 0.25;
    } else {
        pricePerKWh = 0;
    }

    return charge.consumption * pricePerKWh;
}

export default getChargesHistory;