import { FastifyInstance } from 'fastify';
import getMessage from "./getMessage";
import getAllCharger from './getAllCharger';
import getCharger from './getCharger';
import getChargesHistory from './getChargesHistory';
import { getCompanies } from './getCompanies';
import { insertToken } from './insertToken';
import { refreshToken } from './refreshToken';

async function app(fastify: FastifyInstance, opts: any){
  fastify.get('/', getMessage);
  fastify.get('/charger', getAllCharger);
  fastify.get('/charger/:id', getCharger);
  fastify.get('/charges', getChargesHistory);
  fastify.get('/companies', getCompanies);
  fastify.post('/oauth/token', insertToken);
  fastify.post('/oauth/refresh-token', refreshToken);
}

export default app;




