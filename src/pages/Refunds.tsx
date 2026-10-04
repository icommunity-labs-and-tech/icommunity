import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import ContactModal from "@/components/home/ContactModal";
import PageSEO from "@/components/PageSEO";
import { webPage, breadcrumbs } from "@/lib/structuredData";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const content = {
  es: {
    seoTitle: "Política de Reembolsos",
    seoDesc: "Política de reembolsos y derecho de desistimiento de iCommunity Labs & Tech S.L., conforme a la Directiva 2011/83/UE y al RDL 1/2007.",
    h1: "Política de Reembolsos",
    updated: "Última actualización: 23 de julio de 2026",
    sections: [
      {
        title: "1. Alcance",
        body: [
          "La presente política se aplica a todos los servicios contratados a iCommunity Labs & Tech S.L. (\"iCommunity\") por consumidores y clientes profesionales, y complementa las Condiciones de Servicio publicadas en /terminos.",
        ],
      },
      {
        title: "2. Derecho de desistimiento (consumidores UE)",
        body: [
          "Conforme al artículo 102 del RDL 1/2007 y a la Directiva 2011/83/UE sobre derechos de los consumidores, cualquier consumidor con residencia en la Unión Europea dispone de un plazo de 14 días naturales desde la formalización del contrato para desistir del mismo, sin necesidad de justificar la decisión y sin penalización.",
          "Para ejercer el derecho de desistimiento, el consumidor deberá enviar una comunicación inequívoca a hello@icommunity.io indicando: nombre completo, dirección postal, servicio contratado, fecha de contratación y una declaración expresa de desistimiento. Puede utilizar el modelo de formulario del Anexo B del RDL 1/2007.",
        ],
      },
      {
        title: "3. Excepciones al derecho de desistimiento",
        body: [
          "Conforme al artículo 103 del RDL 1/2007, el derecho de desistimiento no se aplicará a: (a) servicios completamente ejecutados cuando la ejecución haya comenzado, con previo consentimiento expreso del consumidor y con reconocimiento por su parte de la pérdida del derecho de desistimiento una vez ejecutado el contrato; (b) suministro de contenido digital no prestado en soporte material cuando la ejecución haya comenzado con el consentimiento previo y expreso del consumidor y con conocimiento de la pérdida del derecho; (c) servicios personalizados o realizados conforme a especificaciones del consumidor.",
        ],
      },
      {
        title: "4. Reembolsos por desistimiento",
        body: [
          "En caso de desistimiento válido, iCommunity reembolsará todos los pagos recibidos, incluidos los gastos de entrega, sin demoras indebidas y, en cualquier caso, en un plazo máximo de 14 días naturales desde la fecha de recepción de la comunicación de desistimiento.",
          "El reembolso se efectuará utilizando el mismo medio de pago empleado por el consumidor para la transacción inicial, salvo que este haya dispuesto expresamente lo contrario y siempre que no se le repercuta ningún gasto adicional.",
          "Si el consumidor solicitó el inicio del servicio dentro del plazo de desistimiento y posteriormente desiste, deberá abonar el importe proporcional a la parte del servicio ya prestada hasta el momento del desistimiento.",
        ],
      },
      {
        title: "5. Reembolsos por incumplimiento",
        body: [
          "El cliente tendrá derecho a reembolso total o parcial cuando iCommunity incumpla materialmente sus obligaciones contractuales y, tras un requerimiento escrito con plazo mínimo de 15 días para subsanar, no restablezca el servicio conforme a lo pactado.",
          "En servicios de suscripción, el importe reembolsable se calculará proporcionalmente al período no consumido desde la fecha del incumplimiento no subsanado.",
        ],
      },
      {
        title: "6. Servicios no reembolsables",
        body: [
          "Salvo lo previsto en el punto 2 (derecho de desistimiento de consumidores) o en el punto 5 (incumplimiento imputable a iCommunity), no serán reembolsables: (i) los servicios profesionales ya prestados; (ii) las licencias y créditos de plataforma ya consumidos; (iii) los servicios personalizados o adaptados a las especificaciones del cliente; (iv) las tarifas de configuración inicial (onboarding) una vez completadas.",
        ],
      },
      {
        title: "7. Suscripciones recurrentes",
        body: [
          "Las suscripciones podrán cancelarse en cualquier momento con efecto al final del período de facturación en curso. No se practicarán reembolsos parciales por la porción no utilizada del período ya facturado, salvo obligación legal en contrario o incumplimiento imputable a iCommunity.",
        ],
      },
      {
        title: "8. Cómo solicitar un reembolso",
        body: [
          "Envíe su solicitud a hello@icommunity.io indicando: nombre y datos de contacto, servicio contratado, número de factura o identificador de contrato, motivo de la solicitud y documentación de soporte si procede. iCommunity acusará recibo en un plazo máximo de 5 días hábiles y resolverá la solicitud en un máximo de 14 días naturales.",
        ],
      },
      {
        title: "9. Resolución alternativa de litigios",
        body: [
          "Los consumidores residentes en la UE pueden acceder a la plataforma de resolución de litigios en línea de la Comisión Europea en https://ec.europa.eu/consumers/odr. Igualmente, pueden dirigirse a las autoridades españolas de consumo o a los órganos de arbitraje competentes.",
        ],
      },
      {
        title: "10. Contacto",
        body: [
          "iCommunity Labs & Tech S.L. · calle Colmenares, 3 – Bajo Dcha, 28014 Madrid (España) · hello@icommunity.io",
        ],
      },
    ],
  },
  en: {
    seoTitle: "Refund Policy",
    seoDesc: "Refund policy and right of withdrawal of iCommunity Labs & Tech S.L., in accordance with Directive 2011/83/EU and Spanish RLD 1/2007.",
    h1: "Refund Policy",
    updated: "Last updated: 23 July 2026",
    sections: [
      {
        title: "1. Scope",
        body: [
          "This policy applies to all services contracted from iCommunity Labs & Tech S.L. (\"iCommunity\") by consumers and business customers, and complements the Terms of Service published at /terminos.",
        ],
      },
      {
        title: "2. Right of withdrawal (EU consumers)",
        body: [
          "In accordance with Article 102 of Spanish RLD 1/2007 and Directive 2011/83/EU on consumer rights, any consumer resident in the European Union has a period of 14 calendar days from the conclusion of the contract to withdraw from it, without justification and without penalty.",
          "To exercise the right of withdrawal, the consumer must send an unequivocal communication to hello@icommunity.io indicating: full name, postal address, contracted service, date of contract and an explicit withdrawal statement. The model form in Annex B of RLD 1/2007 may be used.",
        ],
      },
      {
        title: "3. Exceptions to the right of withdrawal",
        body: [
          "In accordance with Article 103 of RLD 1/2007, the right of withdrawal does not apply to: (a) fully performed services where performance has begun with the consumer's prior express consent and acknowledgement of loss of the withdrawal right once the contract is fully performed; (b) the supply of digital content not on a tangible medium where performance has begun with the consumer's prior express consent and awareness of loss of the right; (c) personalised services or services made to the consumer's specifications.",
        ],
      },
      {
        title: "4. Refunds upon withdrawal",
        body: [
          "In the event of a valid withdrawal, iCommunity will refund all payments received, including delivery costs, without undue delay and in any case within a maximum period of 14 calendar days from the date of receipt of the withdrawal notice.",
          "The refund will be made using the same payment method used by the consumer for the initial transaction, unless the consumer expressly agrees otherwise, and in any case at no additional cost.",
          "If the consumer requested the start of the service within the withdrawal period and subsequently withdraws, they must pay the amount proportional to the part of the service provided up to the moment of withdrawal.",
        ],
      },
      {
        title: "5. Refunds for breach",
        body: [
          "The customer will be entitled to a full or partial refund where iCommunity materially breaches its contractual obligations and, following a written request with a minimum period of 15 days to cure, does not restore the service as agreed.",
          "For subscription services, the refundable amount will be calculated proportionally to the unused period from the date of the unremedied breach.",
        ],
      },
      {
        title: "6. Non-refundable services",
        body: [
          "Except as provided in point 2 (consumer right of withdrawal) or point 5 (breach attributable to iCommunity), the following are non-refundable: (i) professional services already rendered; (ii) platform licences and credits already consumed; (iii) personalised or customer-tailored services; (iv) onboarding fees once completed.",
        ],
      },
      {
        title: "7. Recurring subscriptions",
        body: [
          "Subscriptions may be cancelled at any time with effect at the end of the current billing period. No partial refunds will be issued for the unused portion of an already invoiced period, unless required by law or in the event of breach attributable to iCommunity.",
        ],
      },
      {
        title: "8. How to request a refund",
        body: [
          "Send your request to hello@icommunity.io including: name and contact details, contracted service, invoice number or contract identifier, reason for the request and supporting documentation if applicable. iCommunity will acknowledge receipt within 5 business days and resolve the request within a maximum of 14 calendar days.",
        ],
      },
      {
        title: "9. Alternative dispute resolution",
        body: [
          "Consumers resident in the EU may access the European Commission's online dispute resolution platform at https://ec.europa.eu/consumers/odr. They may also contact Spanish consumer authorities or the competent arbitration bodies.",
        ],
      },
      {
        title: "10. Contact",
        body: [
          "iCommunity Labs & Tech S.L. · calle Colmenares, 3 – Bajo Dcha, 28014 Madrid (Spain) · hello@icommunity.io",
        ],
      },
    ],
  },
};

const Refunds = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <div className="min-h-screen bg-[hsl(225,30%,6%)] text-white/80">
      <PageSEO
        title={t.seoTitle}
        description={t.seoDesc}
        path="/reembolsos"
        lang={lang}
        jsonLd={[
          webPage({ path: "/reembolsos", name: t.seoTitle, description: t.seoDesc, lang }),
          breadcrumbs([
            { name: lang === "es" ? "Inicio" : "Home", path: "/" },
            { name: t.seoTitle, path: "/reembolsos" },
          ]),
        ]}
      />
      <Navbar onOpenModal={() => setModalOpen(true)} />
      <ContactModal open={modalOpen} onOpenChange={setModalOpen} />

      <main className="ic-container pt-28 pb-20">
        <article className="max-w-3xl mx-auto space-y-10 text-sm leading-relaxed">
          <header className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-white">{t.h1}</h1>
            <p className="text-white/40 text-xs">{t.updated}</p>
          </header>
          {t.sections.map((sec, i) => (
            <section key={i} className="space-y-3">
              <h2 className="text-lg font-semibold text-white border-b border-white/10 pb-2">{sec.title}</h2>
              {sec.body.map((p, j) => <p key={j}>{p}</p>)}
            </section>
          ))}
        </article>
      </main>

      <Footer onOpenModal={() => setModalOpen(true)} />
    </div>
  );
};

export default Refunds;