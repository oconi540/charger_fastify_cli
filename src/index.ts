import Fastify from 'fastify';
import App from './app';

async function start(){
    const fastify = Fastify({
        logger: true,
    });

    await fastify.register(App);

    try {
        await fastify.listen({
            host: '0.0.0.0',
            port: 8081,
        });
        console.log('Server is running at http://0.0.0.0:8081/');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

start().catch(err => {
    console.error('Error starting the server:', err);
    process.exit(1);
});