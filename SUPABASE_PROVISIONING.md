# Provisionamento do primeiro usuário

O esquema do produto está no projeto Love Sênior e ainda não contém usuários da aplicação. Não há administrador de demonstração.

Quando o proprietário fornecer as credenciais, execute o provisionamento em ambiente local confiável:

1. Se .env.local ainda não existir, copie .env.example para .env.local.
2. Preencha SUPABASE_PROVISION_EMAIL, SUPABASE_PROVISION_NAME, SUPABASE_PROVISION_PASSWORD (12 ou mais caracteres) e SUPABASE_PROVISION_ROLE=admin.
3. Preencha SUPABASE_SECRET_KEY ou SUPABASE_SERVICE_ROLE_KEY, somente em .env.local. Use exatamente uma chave server-side.
4. Execute npm run supabase:provision-user.
5. Remova a senha temporária do arquivo após a criação e valide o login com a conta aprovada.

Nunca copie a chave administrativa para um arquivo versionado, variável NEXT_PUBLIC_*, issue ou log. Para produção, faça o provisionamento em uma sessão segura e remova os valores do ambiente ao terminar.

