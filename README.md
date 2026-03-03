# LexFlow SaaS (Next.js + Node.js)

SaaS web para escritórios de advocacia com triagem digital de casos.

## Stack
- **Frontend:** Next.js 14 (App Router)
- **Backend:** Node.js + Express + TypeScript
- **Banco:** PostgreSQL com Prisma ORM
- **Auth:** JWT + bcrypt

## Funcionalidades implementadas
- Página inicial explicando o serviço
- Cadastro e login de advogados
- Dashboard protegido por autenticação
- Criação de formulário de triagem personalizado
- Página pública para clientes responderem o formulário
- Geração automática de resumo do caso
- Persistência no PostgreSQL
- Base de dados com campos de assinatura para expansão futura

## Arquitetura escalável
- Monorepo com workspaces (`apps/web` e `apps/api`)
- Backend modular (`modules/auth`, `modules/forms`, `modules/responses`)
- Separação de responsabilidades (middleware, config, utils)
- Prisma para evolução de schema e migrações

## Como rodar
1. Instale dependências:
   ```bash
   npm install
   ```
2. Configure variáveis de ambiente:
   - copie `apps/api/.env.example` para `apps/api/.env`
   - copie `apps/web/.env.example` para `apps/web/.env.local`
3. Gere client Prisma e rode migrações:
   ```bash
   npm run prisma:generate --workspace @lawsaas/api
   npm run prisma:migrate --workspace @lawsaas/api
   ```
4. Inicie em desenvolvimento:
   ```bash
   npm run dev:api
   npm run dev:web
   ```

## Próxima etapa sugerida (assinaturas)
- Integrar gateway (Stripe/Pagar.me)
- Criar webhook de atualização de assinatura
- Liberar recursos conforme `subscriptionStatus`
