import { createClient } from '@supabase/supabase-js';
import { config } from '../config';

const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_KEY);

export async function saveMessage({ phone, role, content }: { phone: string; role: string; content: string }) {
  await supabase.from('messages').insert({ phone, role, content });
}

export async function getHistory(phone: string) {
  const { data } = await supabase.from('messages').select('role, content').eq('phone', phone).order('created_at').limit(20);
  return data || [];
}