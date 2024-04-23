import { FastifyInstance } from 'fastify';
import getCharger from './getCharger';
import getMessage from "./getMessage";

async function app(fastify: FastifyInstance, opts: any){
  fastify.get('/', getMessage);
  fastify.get('/charger/:id', getCharger);
}

export default app;




