# Plano e estado do clone Love Sênior

## Objetivo

Preparar uma cópia operacional da plataforma Love Sênior para um período de avaliação de sete dias. O teste deve usar a autenticação e o banco reais do projeto Love Sênior, sem perfis de acesso fictícios nem registros semeados.

## Concluído

1. Criada uma pasta independente sem histórico Git e sem arquivos de ambiente da origem.
2. Aplicada a identidade Love Sênior. O arquivo de logo enviado pelo proprietário foi copiado como PNG original para o site e o ícone.
3. Mantidos os módulos de administração, família e cuidador, com autenticação Supabase e provedores operacionais selecionados.
4. Conectado ao Supabase `igbuurshmqrnpgpnyusa`, em `sa-east-1`. As migrações estão aplicadas; 15 tabelas públicas estão vazias e com RLS habilitada.
5. Removidos a entrada de perfil sem senha, o seed fictício e a configuração local de D1 criada para a demonstração.
6. Revogada a execução de `public.rls_auto_enable()` por `PUBLIC`, `anon` e `authenticated`, após o alerta do Security Advisor.
7. Mantidos `noindex` e rascunhos jurídicos enquanto o link de avaliação é preparado.

## Para liberar o teste

1. Adicionar `SUPABASE_SECRET_KEY` apenas ao arquivo local privado e ao cofre do host.
2. Definir a pessoa responsável pelo teste e provisionar a conta administrativa real. Criar também contas de família/cuidador caso precisem avaliar esses perfis.
3. Escolher hospedagem, domínio e redirects oficiais do Supabase Auth.
4. Confirmar contatos, suporte, termos e política de privacidade para o período de avaliação.
5. Configurar Turnstile e serviços de notificação conforme os fluxos que serão usados.
6. Validar login, permissões, leitura e gravação com as contas aprovadas; publicar o link e iniciar a contagem dos sete dias.
7. Desativar as contas autorizadas ao fim da avaliação. Ainda não há expiração automática por data.

## Limites atuais

O projeto Supabase não contém usuários nem dados de aplicação. O segredo server-side, a conta do avaliador, a hospedagem e o domínio ainda estão pendentes; por isso, a URL local já apresenta o login real, mas ainda não aceita acesso operacional até o provisionamento.
