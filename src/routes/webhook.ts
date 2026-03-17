import { FastifyInstance } from 'fastify';
import { processMessage } from '../services/messageProcessor';
import { config } from '../config';

export async function webhookRouter(app: FastifyInstance) {
  app.get('/', async (req: any, reply: any) => {
    const p = req.query as Record<string, string>;
    if (p['hub.verify_token'] === config.WEBHOOK_VERIFY_TOKEN) return reply.send(p['hub.challenge']);
    return reply.status(403).send('Forbidden');
  });

  app.post('/', async (req: any, reply: any) => {
    reply.status(200).send('OK');
    const msg = (req.body as any)?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (!msg) return;
    await processMessage({ from: msg.from, text: msg.text?.body || '', type: msg.type });
  });
}