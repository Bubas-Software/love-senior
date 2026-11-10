# Supabase Auth — Love Sênior

O clone aponta para o projeto `igbuurshmqrnpgpnyusa`, com Supabase Auth selecionado e migrações aplicadas. Ainda não há usuários de aplicação. O login espera credenciais reais; a chave server-side e a conta inicial ainda precisam ser provisionadas.

## Chaves

- NEXT_PUBLIC_SUPABASE_URL: URL do projeto, já preenchida no exemplo.
- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: chave publicável do projeto.
- SUPABASE_SECRET_KEY ou SUPABASE_SERVICE_ROLE_KEY: somente no servidor; configure apenas uma delas.

Nunca use uma secret/service-role key com o prefixo NEXT_PUBLIC_, em código client, no Git ou em logs.

## URLs de Auth

Quando o domínio for definido, configure Supabase Auth:

- Site URL: domínio oficial Love Sênior.
- Redirect permitido: domínio oficial seguido por /auth/callback.
- Desenvolvimento local: http://localhost:5173/auth/callback.

O host ainda não foi definido; não invente redirects de produção. Configure também e-mail de Auth e SMTP quando o remetente oficial for entregue.

## Primeiro administrador

Quando a conta inicial e a chave server-side forem fornecidas, preencha as variáveis de provisionamento em .env.local e execute npm run supabase:provision-user. Use senha forte e remova os valores temporários após a criação. Não crie contas ou dados fictícios no banco remoto.

