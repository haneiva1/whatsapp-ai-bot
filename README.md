# whatsapp-ai-bot

AI-powered WhatsApp chatbot with intent detection and context-aware replies. Built for businesses that need to handle high message volumes automatically.

## Demo

```
User: "Do you have the red model in size M?"
Bot:  "Yes! Size M in red is $45. Want to place an order?"
User: "How long does shipping take?"
Bot:  "3-5 business days. Shall I confirm your order?"
```

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js + TypeScript |
| Framework | Fastify |
| AI | OpenAI GPT-4o |
| Messaging | WhatsApp Business Cloud API |
| Storage | Supabase (Postgres) |

## Features

- Webhook with HMAC-SHA256 signature verification
- Intent detection: greeting, inquiry, order, support, escalation
- Conversation history per phone number (last 20 messages)
- Human escalation trigger ("agent", "human", "speak to someone")
- Multi-language auto-detection
- Typing delay simulation for natural feel

## Architecture

```
WhatsApp Cloud API -> POST /webhook (<200ms response)
-> Intent Classifier (GPT-4o)
-> inquiry:  Product lookup + AI reply
-> order:    Order creation flow
-> support:  FAQ + AI reply
-> escalate: Notify human agent
-> Reply via WhatsApp API
```

## Setup

```bash
git clone https://github.com/haneiva1/whatsapp-ai-bot
cd whatsapp-ai-bot && npm install
cp .env.example .env
npm run dev
```

## Performance

- Webhook response: < 200ms
- AI reply: 1-3s
- Concurrent conversations: 100+

---
Built by **Hans Aneiva** — AI automation developer, La Paz, Bolivia.