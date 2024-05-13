import { FastifyRequest as Request, FastifyReply as Reply } from 'fastify';
import { KnexRepository } from './repository';
import { Token } from './models';

const repository = new KnexRepository();

export async function insertTokenHandler(request: Request, reply: Reply): Promise<void> {
    const { id, secret } = request.body as { id: string; secret: string };

    try {
        if (!id || !secret) {
            reply.code(400).send({ error: 'Verifica el id y el secret son obligatorios.' });
        }

        const companyId: number = parseInt(id);
        const isValid = await repository.findCompanyByIdAndSecret(companyId, secret);

        if (!isValid) {
            reply.code(400).send({ error: 'Credenciales inválidas. Verifica el id y el secret proporcionados.' });
        }

        const accessToken: string = accessRefreshToken();
        const refreshToken: string = accessRefreshToken();
        const currentDate = new Date();
        const expiresIn = new Date(currentDate);
        expiresIn.setDate(currentDate.getDate() + 7);

        const token: Token = {
            access_token: accessToken,
            expires_in: expiresIn,
            refresh_token: refreshToken,
            company_id: companyId
        };

        await repository.insertToken(token);

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
