import { FastifyInstance } from 'fastify';
import getMessage from "./getMessage";
import getCharger from './getCharger';
import getAllCharger from './getAllCharger';

async function app(fastify: FastifyInstance, opts: any){
  fastify.get('/', getMessage);
  fastify.get('/charger', getAllCharger);
  fastify.get('/charger/:id', getCharger);
}

export default app;




