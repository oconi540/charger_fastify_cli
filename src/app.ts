import { FastifyInstance } from 'fastify';
import getMessage from "./getMessage";
import getCharger from './getCharger';
import getAllCharger from './getAllCharger';
import getHistoryCharger from './getHistoryCharger';

async function app(fastify: FastifyInstance, opts: any){
  fastify.get('/', getMessage);
  fastify.get('/charger', getAllCharger);
  fastify.get('/charger/:id', getCharger);
  fastify.get('/charges/:id', getHistoryCharger);
}

export default app;




