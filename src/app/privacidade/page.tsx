import type { Metadata } from "next";
import Link from "next/link";
import { PublicFooter } from "@/components/PublicFooter";
import { PublicNav } from "@/components/PublicNav";

export const metadata: Metadata = {
  title: "Política de Privacidade em revisão",
  description: "Política de privacidade da Love Sênior em revisão para a avaliação operacional.",
};

export default function PrivacyPage() {
  return (
    <>
      <PublicNav />
      <main className="flex-1 bg-[var(--surface-soft)]">
        <section className="border-b border-[var(--border)] bg-white">
          <div className="container-page py-12 sm:py-16">
            <span className="eyebrow">Transparência</span>
            <h1 className="section-title mt-4 max-w-3xl">Política de Privacidade</h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">
              Rascunho para revisão da Love Sênior. Esta página ainda não é a política oficial da empresa.
            </p>
          </div>
        </section>

        <article className="container-page max-w-4xl py-12 sm:py-16">
          <aside className="mb-6 rounded-xl border border-[var(--border-strong)] bg-[var(--brand-light)] p-5 text-sm leading-6 text-[var(--brand-deep)]">
            Antes de publicar o site, a Love Sênior deve confirmar a identidade do controlador, as finalidades e bases legais,
            os prazos de retenção, os fornecedores envolvidos e o canal para pedidos de titulares, com revisão jurídica.
          </aside>
          <div className="space-y-8 rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[0_12px_35px_rgba(72,35,31,0.06)] sm:p-10">
            <LegalSection title="Tratamento de informações durante a avaliação">
              <p>Os formulários e portais podem receber contatos, candidaturas profissionais, dados de contas e registros de acompanhamento. A Love Sênior deve confirmar as finalidades, bases legais, responsáveis e dados necessários antes de usar cada fluxo.</p>
              <p>Durante o teste, utilize somente informações autorizadas pela Love Sênior e necessárias para avaliar o funcionamento da plataforma.</p>
            </LegalSection>

            <LegalSection title="Fluxos que precisam de revisão">
              <ul className="list-disc space-y-2 pl-5">
                <li>Solicitações de atendimento e os dados necessários para respondê-las.</li>
                <li>Cadastro de profissionais e o processo de análise dessas informações.</li>
                <li>Contas e registros utilizados pelas famílias, cuidadores e administração.</li>
                <li>Documentos e imagens que possam conter dados pessoais ou de saúde.</li>
              </ul>
              <p>O inventário definitivo e as regras de cada processo devem ser confirmados pela Love Sênior antes da publicação.</p>
            </LegalSection>

            <LegalSection title="Informações a definir antes de ativar os formulários">
              <ul className="list-disc space-y-2 pl-5">
                <li>Razão social, nome empresarial, CNPJ e endereço do controlador, se aplicáveis.</li>
                <li>Finalidades, bases legais e dados estritamente necessários em cada formulário.</li>
                <li>Retenção, exclusão, compartilhamentos e transferências internacionais, se houver.</li>
                <li>Medidas de segurança, fornecedores contratados e procedimento para atender pedidos.</li>
                <li>Telefone, e-mail ou outro canal oficial de privacidade.</li>
              </ul>
            </LegalSection>

            <LegalSection title="Contato">
              <p>O canal oficial ainda será informado. Até lá, esta página não deve ser usada para encaminhar solicitações sobre dados pessoais.</p>
              <p>Consulte também o <Link className="font-semibold text-[var(--brand)] underline" href="/termos">rascunho dos Termos de Uso</Link>.</p>
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
