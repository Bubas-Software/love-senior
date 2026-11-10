import type { Metadata } from "next";
import Link from "next/link";
import { PublicFooter } from "@/components/PublicFooter";
import { PublicNav } from "@/components/PublicNav";

export const metadata: Metadata = {
  title: "Termos de Uso em revisão",
  description: "Termos de uso da Love Sênior para revisão antes da avaliação operacional.",
};

export default function TermsPage() {
  return (
    <>
      <PublicNav />
      <main className="flex-1 bg-[var(--surface-soft)]">
        <section className="border-b border-[var(--border)] bg-white">
          <div className="container-page py-12 sm:py-16">
            <span className="eyebrow">Uso responsável</span>
            <h1 className="section-title mt-4 max-w-3xl">Termos de Uso</h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">
              Rascunho para revisão da Love Sênior. Esta página ainda não é o termo oficial do serviço.
            </p>
          </div>
        </section>

        <article className="container-page max-w-4xl py-12 sm:py-16">
          <aside className="mb-6 rounded-xl border border-[var(--border-strong)] bg-[var(--brand-light)] p-5 text-sm leading-6 text-[var(--brand-deep)]">
            Antes de publicar, confirme a identificação da empresa, o escopo real dos serviços, as responsabilidades de cada perfil,
            as regras de acesso e suporte e os canais oficiais. Solicite revisão jurídica.
          </aside>
          <div className="space-y-8 rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[0_12px_35px_rgba(72,35,31,0.06)] sm:p-10">
            <LegalSection title="Finalidade da avaliação">
              <p>Esta versão está sendo preparada para a Love Sênior testar os fluxos operacionais do site e dos portais. Os serviços, as responsabilidades de cada perfil e o suporte devem ser confirmados pela empresa antes da liberação.</p>
              <p>O sistema não oferece orientação médica nem substitui a avaliação dos profissionais responsáveis pelo cuidado.</p>
            </LegalSection>

            <LegalSection title="Acesso e informações">
              <ul className="list-disc space-y-2 pl-5">
                <li>Use apenas contas autorizadas e não compartilhe suas credenciais.</li>
                <li>Insira somente informações necessárias e autorizadas pela Love Sênior para a avaliação.</li>
                <li>Não envie dados de saúde ou documentos sem a autorização e os procedimentos definidos pela empresa.</li>
                <li>Comunique à Love Sênior qualquer uso indevido, erro de acesso ou falha de segurança.</li>
              </ul>
            </LegalSection>

            <LegalSection title="Portais e registros">
              <p>As áreas de administração, família e cuidador têm permissões diferentes. A Love Sênior deve configurar as contas e revisar as informações inseridas durante o período de avaliação.</p>
            </LegalSection>

            <LegalSection title="Privacidade e contato">
              <p>A Política de Privacidade ainda está em revisão. Consulte o <Link className="font-semibold text-[var(--brand)] underline" href="/privacidade">rascunho da Política de Privacidade</Link> e siga as orientações da Love Sênior sobre os dados autorizados para o teste.</p>
              <p>O canal de contato será informado quando a configuração oficial estiver pronta.</p>
            </LegalSection>
          </div>
        </article>
      </main>
      <PublicFooter />
    </>
  );
}

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3 text-sm leading-7 text-[var(--muted)]">
      <h2 className="text-lg font-semibold leading-6 text-[var(--foreground)]">{title}</h2>
      {children}
    </section>
  );
}
