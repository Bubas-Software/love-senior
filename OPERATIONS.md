# Operação Love Sênior

## Estado do ambiente

- O projeto `igbuurshmqrnpgpnyusa` está ativo em `sa-east-1`.
- As migrações estão aplicadas; as 15 tabelas públicas da aplicação estão vazias e com RLS habilitada.
- Nenhuma conta, paciente, contato, escala, cobrança ou outro registro fictício foi criado no Supabase.
- O `public.rls_auto_enable()` não pode mais ser executado por `PUBLIC`, `anon` ou `authenticated`.
- `.env.local` aponta para Supabase Auth, dados e storage. A chave publishable está configurada; falta a chave server-side e a conta administrativa de teste.

## Preparar o acesso

1. Configure `SUPABASE_SECRET_KEY` apenas em `.env.local` ou no cofre do host.
2. Preencha as variáveis `SUPABASE_PROVISION_*` da conta real autorizada para o teste.
3. Execute `npm run supabase:provision-user` para criar a conta Supabase Auth e o perfil ativo.
4. Inicie a aplicação com `npm run dev` ou publique no host escolhido.
5. Entre em `/login` com o e-mail e a senha dessa conta. Admin pode cadastrar famílias, cuidadores e pacientes conforme o fluxo normal.

## Teste de sete dias

O prazo começa quando a Love Sênior recebe o link e as credenciais. O aplicativo ainda não tem expiração automática por data; ao fim do teste, desative o perfil em `public.profiles` e encerre a conta de teste, conforme a decisão da Love Sênior.

## Antes de enviar o link

- Configurar domínio, URLs de Auth e `LOVE_SENIOR_APP_URL`.
- Confirmar termos, política de privacidade, contatos e canal de suporte.
- Ativar Turnstile e configurar os serviços de e-mail/WhatsApp usados durante a avaliação.
- Validar permissões RLS, uploads privados e recuperação de senha com a conta provisionada.
- Manter `noindex` enquanto o teste estiver em andamento.

Não copie dados de outro cliente nem crie registros fictícios no ambiente Love Sênior. Não exponha `SUPABASE_SECRET_KEY` no navegador.
