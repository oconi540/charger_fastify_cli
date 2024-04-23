import { FastifyRequest as Request, FastifyReply as Reply } from 'fastify';
import knexConfig from '../knexfile';
import knex from 'knex';

const knexInstance = knex(knexConfig.development);

async function getCharger(request: Request, reply: Reply): Promise<void> {
    const { id } = request.params as { id: string };
    try {
        const charger = await knexInstance('charger').where('id', id).first();

        if (charger) {
            reply.send({
                message: 'Charger found successfully',
                success: true,
                data: charger,
            });
        } else {
            reply.code(404).send({
                message: 'Charger not found',
                success: false,
            });
        }
    } catch (error) {
        console.error('Error fetching charger:', error);
        reply.code(500).send({
            message: 'Internal server error',
            success: false,
        });
    }
}

export default getCharger;