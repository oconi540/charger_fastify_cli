import { FastifyRequest as Request, FastifyReply as Reply } from 'fastify';
import { KnexTokenRepository } from './repositories/tokenRepository';
import { Token } from './models/tokenModel';

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

        const accessToken: string = accessRefreshToken();
        const refreshToken: string = accessRefreshToken();
        const expiresIn = new Date();
        expiresIn.setDate(expiresIn.getDate() + 7);

        const token: Token = {
            access_token: accessToken,
            expires_in: expiresIn,
            refresh_token: refreshToken,
            company_id: companyId
        };

        await tokenRepository.insertToken(token);

        reply.code(200).send({
            access_token: accessToken,
            expires_in: expiresIn
        });
    } catch (error) {
        reply.code(500).send({ message: 'Internal server error' });
    }
}

function accessRefreshToken(): string {
    const currentTime: string = new Date().getTime().toString();
    const randomValue: string = Math.floor(Math.random() * 10000).toString();
    return currentTime + randomValue;
}