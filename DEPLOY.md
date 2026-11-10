# Publicação Love Sênior

O projeto Supabase Love Sênior está ativo e com o esquema aplicado, mas o clone ainda não foi publicado. O domínio e o ambiente de hospedagem serão definidos para o teste operacional de sete dias.

## Pré-requisitos

1. Escolher o host, o domínio temporário e a URL HTTPS do teste.
2. Configurar no cofre do host `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` e `SUPABASE_SECRET_KEY`. A chave secreta fica somente no servidor.
3. Provisionar a conta administrativa de teste em Supabase Auth e sincronizar seu perfil com `npm run supabase:provision-user`.
4. Configurar `LOVE_SENIOR_APP_URL`, a Site URL e os redirects de `/auth/callback` no Supabase Auth.
5. Confirmar o canal de contato, termos e política de privacidade para o período de avaliação.
6. Configurar Turnstile antes de receber solicitações públicas.

## Variáveis

Use `.env.example` como inventário. Não publique `.env.local`, senhas, chaves secretas ou dados de pacientes. Os provedores de autenticação, dados e arquivos devem permanecer em `supabase`. O modo protegido deve permanecer desligado apenas no ambiente operacional escolhido; mantenha prévias não operacionais sem acesso aos portais.

## Critério de liberação

O projeto não cria registros fictícios. Antes de entregar o link, valide a conta autorizada, a leitura e gravação de cada perfil, formulários, uploads privados, recuperação de senha e logs. Mantenha `noindex` durante os sete dias e desative os acessos ao encerrar a avaliação.
