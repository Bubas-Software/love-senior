# Preparação do repositório

O código Love Sênior está em uma pasta independente, sem histórico Git importado. O remoto Git ainda não foi informado.

## Ao receber o destino Git

1. Inicialize um repositório independente, caso esta pasta ainda não tenha .git, e adicione somente arquivos revisados.
2. Confirme que .env, .env.local, node_modules, builds e dados locais estão excluídos.
3. Configure o remoto Love Sênior informado pela equipe.
4. Revise os workflows antes do primeiro push. O workflow herdado executa checagens e build; não publica o site.

## Estado atual

- Nome do app: love-senior-demo (projeto Vercel ainda não criado).
- Projeto Supabase: igbuurshmqrnpgpnyusa em sa-east-1, com dados operacionais existentes.
- A migração `20261104183000_schedule_payroll_override` está versionada localmente, mas ainda não foi aplicada ao projeto remoto.
- O consentimento de acesso ao time Vercel Bubas Software e o domínio continuam pendentes.
- Indexação: desativada durante o período de avaliação operacional.
- Typecheck, lint e build Next para Vercel passaram.
- Auditoria de produção: zero vulnerabilidades. Dependências de desenvolvimento ainda têm alertas; atualizações que exigiriam mudanças breaking não foram forçadas.

