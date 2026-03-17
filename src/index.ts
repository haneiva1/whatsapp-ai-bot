import Fastify from 'fastify';
import { webhookRouter } from './routes/webhook';
import { config } from './config';

const app = Fastify({ logger: true });
app.register(webhookRouter, { prefix: '/webhook' });
app.get('/health', async () => ({ status: 'ok', ts: new Date().toISOString() }));
app.listen({ port: config.PORT, host: '0.0.0.0' });