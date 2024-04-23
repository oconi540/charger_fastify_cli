import { FastifyRequest as Request, FastifyReply as Reply } from 'fastify';

let message = { "hello": "world!" };

async function getMessage(request: Request, reply: Reply) {
    return message;
}

export default getMessage;