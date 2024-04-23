import { FastifyRequest as Request, FastifyReply as Reply } from 'fastify';
import knexConfig from '../knexfile';
import knex from 'knex';

const knexInstance = knex(knexConfig.development);

async function getAllCharger(request: Request, reply: Reply): Promise<void> {
    try {
        const chargers = await knexInstance('charger');

        if (chargers.length > 0) {
            reply.send({
                message: 'Chargers found successfully',
                success: true,
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

export default getAllCharger;