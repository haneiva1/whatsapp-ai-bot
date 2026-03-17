import { config } from '../config';

export async function sendMessage(to: string, text: string) {
  const res = await fetch(
    'https://graph.facebook.com/v18.0/' + config.WHATSAPP_PHONE_ID + '/messages',
    {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + config.WHATSAPP_TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify({ messaging_product: 'whatsapp', to, type: 'text', text: { body: text } }),
    }
  );
  if (!res.ok) throw new Error('WhatsApp API error: ' + await res.text());
  return res.json();
}