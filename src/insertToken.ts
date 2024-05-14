import { FastifyRequest as Request, FastifyReply as Reply } from 'fastify';
import { KnexTokenRepository } from './repositories/tokenRepository';
import { KnexCompanyRepository } from './repositories/companyRepository';
import { Token } from './models/tokenModel';

const tokenRepository = new KnexTokenRepository();
const companyRepository = new KnexCompanyRepository();

export async function insertToken(request: Request, reply: Reply): Promise<void> {
    const { id, secret } = request.body as { id: string; secret: string };

    try {
        if (!id || !secret) {
            reply.code(400).send({ error: 'Verifica el id y el secret son obligatorios.' });
        }

        const companyId: number = parseInt(id);
        const isValid = await companyRepository.findCompanyByIdAndSecret(companyId, secret);

        if (!isValid) {
            reply.code(400).send({ error: 'Credenciales inválidas. Verifica el id y el secret proporcionados.' });
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
            expires_in: expiresIn,
            refresh_token: refreshToken
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
