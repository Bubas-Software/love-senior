# Supabase Storage — Love Sênior

As migrações criaram dois buckets privados:

- record-photos: JPEG, PNG ou WebP, até 3 MiB.
- contracts: PDF, até 10 MB decimais.

As políticas de Storage limitam leitura e escrita por papel, paciente/designação e registro associado. Famílias têm leitura autorizada; cuidadores só acessam registros de pacientes designados; uploads e remoções de contratos são administrativos.

Nenhum arquivo foi inserido. Não use documentos nem fotos reais na prévia. Não torne esses buckets públicos e não conceda acesso usando a chave secreta no navegador.

