# Dados e políticas — Supabase Love Sênior

O projeto `igbuurshmqrnpgpnyusa` está ativo e recebeu as migrações do produto. As 15 tabelas públicas da aplicação estão vazias e com RLS habilitada. Não foram criados usuários nem inseridos registros fictícios.

## Domínio

O esquema inclui perfis, pacientes, vínculos de cuidadores, leads, candidaturas profissionais, perfis de cuidadores, registros diários, auditoria, rate limits, contratos, escalas e estruturas financeiras/de remuneração.

As tabelas da aplicação em public têm RLS habilitada. Acesso autenticado é limitado por papel, vínculo familiar ou designação ativa de cuidador. Leads, candidaturas e rate limits são acessados por rotas de servidor; o navegador não recebe a chave administrativa. Buckets de fotos e contratos são privados.

## Regras para desenvolvimento

- Trate informações de saúde, contratos e dados de cuidadores como sensíveis.
- Use somente contas autorizadas para a avaliação Love Sênior; não importe dados de outro cliente.
- Insira dados operacionais somente quando a Love Sênior confirmar a autorização, finalidade e tratamento aplicáveis.
- Adicione novas alterações como migrações novas; não edite migrações já aplicadas.
- Antes de habilitar formulários, configure a chave server-side e Turnstile.
- Depois de mudanças DDL, confira RLS, políticas, grants e Supabase Advisors.

A permissão `EXECUTE` de `public.rls_auto_enable()` foi revogada para `PUBLIC`, `anon` e `authenticated` após a revisão do Security Advisor.

