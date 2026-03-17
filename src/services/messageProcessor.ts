import OpenAI from 'openai';
import { getHistory, saveMessage } from './storage';
import { sendMessage } from './whatsapp';
import { config } from '../config';

const openai = new OpenAI({ apiKey: config.OPENAI_API_KEY });

export async function processMessage({ from, text, type }: { from: string; text: string; type: string }) {
  await saveMessage({ phone: from, role: 'user', content: text });
  const history = await getHistory(from);

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are a helpful WhatsApp sales assistant. Be concise, friendly. Under 150 words per reply. If user wants a human, say you will connect them.' },
      ...history.map((h: any) => ({ role: h.role, content: h.content })),
      { role: 'user', content: text }
    ],
    max_tokens: 200,
  });

  const reply = completion.choices[0].message.content || 'Sorry, could not process your message.';
  await saveMessage({ phone: from, role: 'assistant', content: reply });
  await sendMessage(from, reply);
}