# SaaS Starter com Next.js

Estrutura inicial de um SaaS com:
- Login
- Cadastro de usuário
- Dashboard simples
- Integração com PostgreSQL via Prisma
- Base pronta para sistema de assinatura (campos Stripe e status de plano)

## Requisitos
- Node.js 18+
- PostgreSQL

## Rodando localmente

1. Instale dependências:
   ```bash
   npm install
   ```
2. Copie variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```
3. Gere cliente Prisma e rode migração:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate -- --name init
   ```
4. (Opcional) Seed de usuário inicial:
   ```bash
   npm run db:seed
   ```
5. Inicie a aplicação:
   ```bash
   npm run dev
   ```

## Estrutura de assinatura
O modelo `Subscription` já inclui:
- `status` (`TRIAL`, `ACTIVE`, `PAST_DUE`, `CANCELED`)
- `plan`
- `stripeCustomerId`
- `stripePriceId`
- controle de trial e ciclo (`trialEndsAt`, `currentPeriodEnd`)

Com isso, você pode plugar Stripe Webhooks e checkout depois sem refatorar o core do banco.
