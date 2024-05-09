import { FastifyRequest as Request, FastifyReply as Reply } from 'fastify';
import { KnexCompanyRepository } from './companyRepository';

const companyRepository = new KnexCompanyRepository();

export const generateToken = async (request: Request, reply: Reply): Promise<void> => {
    try {
        const { id, secret } = request.body as { id: string; secret: string };

        if (!id || !secret) {
            reply.code(400).send({ error: 'Verifica el id y el secret son obligatorios.' });
        }

        const isValid = await verifyToken(parseInt(id), secret);

        if (!isValid) {
            reply.code(400).send({ error: 'Credenciales inválidas. Verifica el id y el secret proporcionados.' });
        }

        const accessToken = accessRefreshToken();
        const expiresIn = 143253;
        const refreshToken = accessRefreshToken();

        reply.code(200).send({
            access_token: accessToken,
            expires_in: expiresIn,
            refresh_token: refreshToken
        });
    } catch (error) {
        reply.code(500).send({ message: 'Internal server error' });
    }
}

async function verifyToken(id: number, secret: string): Promise<boolean> {
    const company = await companyRepository.findByToken(id, secret);
    return !!company;
}

const accessRefreshToken = (): string => {
    const currentTime = new Date().getTime().toString();
    const randomValue = Math.floor(Math.random() * 10000).toString();
    return currentTime + randomValue;
}
