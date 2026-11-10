# Rate limiting e formulários

A migração SEC-02 instala public.increment_rate_limit_bucket. A função valida tamanho da chave e janela, remove buckets expirados e incrementa o contador atomicamente.

Somente service_role pode executá-la; o acesso público e autenticado fica revogado. A aplicação chama o RPC pelo servidor com uma chave server-side. Não conceda execução a anon nem ao cliente.

O modo seguro bloqueia leads e candidaturas. Antes de ativá-los, configure as chaves Supabase, Turnstile (site key e secret), revise o texto de consentimento e confirme que o limite distribuído está funcionando.

