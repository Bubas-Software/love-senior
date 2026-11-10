# Ambiente de avaliação operacional

## Local

Copie `.env.example` para `.env.local`, preencha a chave publishable e a chave server-side do projeto Love Sênior, provisione a conta administrativa com `npm run supabase:provision-user` e inicie com `npm run dev`. O login usa Supabase Auth e as telas consultam as tabelas operacionais; não existe seed ou perfil de acesso sem senha.

## Hospedagem

Ainda falta definir o host, domínio e URL do teste. Use variáveis separadas para o ambiente operacional, configure os redirects do Supabase Auth e mantenha as chaves secretas apenas no cofre do host. Pré-visualizações protegidas não devem compartilhar credenciais da operação.

## Verificação antes de liberar

Confirme login com a conta real autorizada, permissões de cada perfil, gravação de dados, upload privado, recuperação de senha, formulários, rate limit, e-mail, Turnstile e logs. Mantenha `noindex` durante o período de sete dias e desative a conta ao final.
