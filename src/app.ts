import { FastifyInstance } from 'fastify';
import getMessage from "./getMessage";
import getAllCharger from './getAllCharger';
import getCharger from './getCharger';
import getChargesHistory from './getChargesHistory';
import getCompaniesList from "./getCompaniesList";

async function app(fastify: FastifyInstance, opts: any){
  fastify.get('/', getMessage);
  fastify.get('/charger', getAllCharger);
  fastify.get('/charger/:id', getCharger);
  fastify.get('/charges', getChargesHistory);
  fastify.get('/companies', getCompaniesList);
}

export default app;




