import { FastifyRequest as Request, FastifyReply as Reply } from 'fastify';
import { KnexTokenRepository } from './repositories/tokenRepository';

const tokenRepository = new KnexTokenRepository();

export async function refreshToken(request: Request, reply: Reply): Promise<void> {
    const { id, secret, refresh_token } = request.body as { id: string; secret: string; refresh_token: string };

    try {
        if (!id || !secret || !refresh_token) {
            reply.code(400).send({ error: 'Credenciales inválidas. Verifica el company_id, secret y refresh_token proporcionados.' });
        }
        const companyId: number = parseInt(id);
        const isValidRefreshToken = await tokenRepository.validateRefreshToken(companyId, refresh_token);

        if (!isValidRefreshToken) {
            reply.code(401).send({ error: 'Acceso no autorizado. El refresh_token es inválido o ha expirado.' });
        }
    } catch (error) {
        reply.code(500).send({ message: 'Internal server error' });
    }
}