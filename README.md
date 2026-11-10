# Love Sênior

Clone independente da plataforma Love Sênior, com identidade visual baseada no perfil `@loveseniorcuidados` e portais operacionais para família, cuidador e administração.

## Ambiente operacional

Requer Node.js 22 ou superior. O projeto Supabase `igbuurshmqrnpgpnyusa` está conectado e contém dados operacionais. As credenciais de teste já provisionadas devem ser compartilhadas por canal seguro. A nova migração para valor excepcional por plantão está versionada localmente e ainda precisa ser aplicada no Supabase.

```powershell
npm ci
if (-not (Test-Path .env.local)) { Copy-Item .env.example .env.local }
# Configure as chaves abaixo em .env.local
npm run supabase:provision-user
npm run dev
```

Para autenticação, dados e arquivos, o template já inclui a URL e a chave publicável do Supabase. Configure `SUPABASE_SECRET_KEY` apenas no servidor; ela não pode usar o prefixo `NEXT_PUBLIC_`. Para criar o administrador, preencha `SUPABASE_PROVISION_EMAIL`, `SUPABASE_PROVISION_NAME`, `SUPABASE_PROVISION_PASSWORD` e `SUPABASE_PROVISION_ROLE=admin`, depois execute `npm run supabase:provision-user`. O comando também cria o perfil ativo em `public.profiles`.

Abra `http://localhost:5173/login`. Os fluxos autenticados usam as contas e os dados operacionais do Supabase; o projeto não semeia registros de pacientes fictícios. O link externo de teste depende da criação do projeto Vercel e da liberação de acesso ao time Bubas Software.

## Supabase

O clone usa o projeto `igbuurshmqrnpgpnyusa` em `sa-east-1`, com RLS habilitado nas tabelas expostas. A migração `20261104183000_schedule_payroll_override` deve ser aplicada antes de salvar valores específicos de escala.

Quando as credenciais forem entregues:

1. Preencha `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` para Auth no navegador.
2. Preencha `SUPABASE_SECRET_KEY` no servidor para operações administrativas. Nunca use `NEXT_PUBLIC_` nessa chave. Se o projeto ainda usar a chave antiga, configure somente `SUPABASE_SERVICE_ROLE_KEY`.
3. Configure `SUPABASE_PROVISION_EMAIL`, `SUPABASE_PROVISION_NAME` e `SUPABASE_PROVISION_PASSWORD`; depois execute `npm run supabase:provision-user` para criar o primeiro administrador.
4. Configure o domínio oficial em Supabase Auth URLs e `LOVE_SENIOR_APP_URL` antes de habilitar acesso.
5. Ative formulários só depois de provisionar Turnstile e confirmar os contatos e avisos legais.

Use `.env.local` para desenvolvimento e o cofre de variáveis do host escolhido para a publicação. Não versione chaves, senhas ou dados de pacientes.

## Publicação

O provedor de hospedagem, domínio e credenciais ainda serão informados. Consulte [DEPLOY.md](./DEPLOY.md) para os pré-requisitos. Os documentos de privacidade e termos são rascunhos para revisão jurídica antes de qualquer publicação pública.

## Comandos

- `npm run dev` — servidor local Vite/Vinext ligado ao Supabase Love Sênior.
- `npm run typecheck` — verificação TypeScript.
- `npm run lint` — ESLint.
- `npm run build:vercel` — build Next.js para um host compatível.
- `npm run supabase:provision-user` — provisionamento administrativo explícito, com chave server-side.
- `npm run supabase:smoke` — conferência do projeto e das tabelas/buckets esperados.
