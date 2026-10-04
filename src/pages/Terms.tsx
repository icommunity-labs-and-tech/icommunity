import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import ContactModal from "@/components/home/ContactModal";
import PageSEO from "@/components/PageSEO";
import { webPage, breadcrumbs, articleSchema, productList } from "@/lib/structuredData";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const content = {
  es: {
    seoTitle: "Condiciones de Servicio",
    seoDesc: "Condiciones generales de contratación y uso de los servicios de iCommunity Labs & Tech S.L., conforme a la normativa de la Unión Europea.",
    h1: "Condiciones de Servicio",
    updated: "Última actualización: 23 de julio de 2026",
    sections: [
      {
        title: "1. Identificación del prestador",
        body: [
          "iCommunity Labs & Tech S.L. (\"iCommunity\"), con domicilio social en calle Colmenares, 3 – Bajo Dcha, 28014 Madrid (España), C.I.F. B88350897, inscrita en el Registro Mercantil de Madrid. Contacto: hello@icommunity.io.",
        ],
      },
      {
        title: "2. Objeto",
        body: [
          "Las presentes condiciones regulan la contratación y uso de los servicios digitales prestados por iCommunity, incluyendo sus plataformas propietarias (CertyPass, Privaro, MusicDibs) y servicios profesionales asociados. La aceptación de estas condiciones es requisito indispensable para acceder a los servicios.",
        ],
      },
      {
        title: "3. Marco legal aplicable",
        body: [
          "La contratación se rige por: la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE); el Real Decreto Legislativo 1/2007 (Ley General para la Defensa de los Consumidores y Usuarios); el Reglamento (UE) 2016/679 (RGPD); el Reglamento (UE) 2022/2065 (Digital Services Act); y demás normativa española y europea aplicable.",
        ],
      },
      {
        title: "4. Proceso de contratación",
        body: [
          "El usuario podrá contratar los servicios a través de la web o mediante propuesta comercial firmada. En todo caso, antes de la formalización, iCommunity pondrá a disposición del usuario información clara sobre las características principales del servicio, el precio total (impuestos incluidos), las modalidades de pago, la duración del contrato y las condiciones de resolución.",
          "Una vez confirmada la contratación, iCommunity remitirá al correo electrónico facilitado por el usuario la confirmación del pedido, que constituirá el contrato entre las partes.",
        ],
      },
      {
        title: "5. Precios y facturación",
        body: [
          "Todos los precios se expresan en euros e incluyen el IVA aplicable, salvo indicación expresa en contrario. iCommunity emitirá factura electrónica conforme al Real Decreto 1619/2012. Los servicios de suscripción se facturarán por adelantado según la periodicidad contratada.",
        ],
      },
      {
        title: "6. Derecho de desistimiento (consumidores)",
        body: [
          "Cuando el cliente sea consumidor en el sentido del artículo 3 del RDL 1/2007, dispondrá de un plazo de 14 días naturales desde la celebración del contrato para desistir del mismo sin necesidad de justificación, conforme a los artículos 102 y siguientes del RDL 1/2007.",
          "El desistimiento no será aplicable cuando el usuario haya solicitado expresamente el inicio de la prestación durante el plazo de desistimiento y el servicio se haya ejecutado completamente, ni a los contenidos digitales suministrados en soporte no material cuya ejecución haya comenzado con consentimiento previo y expreso del usuario y con reconocimiento por su parte de la pérdida del derecho.",
          "El ejercicio del derecho de desistimiento se realizará mediante notificación inequívoca a hello@icommunity.io, indicando el nombre, dirección y contrato del que se desiste. Los importes abonados se reembolsarán conforme a la Política de Reembolsos.",
        ],
      },
      {
        title: "7. Obligaciones del usuario",
        body: [
          "El usuario se compromete a: (i) facilitar información veraz y actualizada; (ii) hacer un uso lícito de los servicios; (iii) no realizar ingeniería inversa, copia o reproducción no autorizada del software; (iv) mantener la confidencialidad de las credenciales de acceso; (v) no utilizar los servicios para actividades contrarias a la ley, la moral o el orden público.",
        ],
      },
      {
        title: "8. Nivel de servicio y disponibilidad",
        body: [
          "iCommunity realizará esfuerzos razonables para mantener los servicios disponibles 24/7, sin perjuicio de las interrupciones necesarias por mantenimiento, actualización o causas de fuerza mayor. Los niveles de servicio específicos, cuando resulten aplicables, se detallarán en el Acuerdo de Nivel de Servicio (SLA) suscrito con el cliente.",
        ],
      },
      {
        title: "9. Propiedad intelectual",
        body: [
          "Todos los derechos de propiedad intelectual e industrial sobre las plataformas, software, contenidos, marcas y materiales de iCommunity son titularidad exclusiva de iCommunity o de sus licenciantes. La contratación del servicio no implica cesión de estos derechos, salvo la licencia de uso limitada, no exclusiva y no transferible necesaria para el disfrute del servicio.",
        ],
      },
      {
        title: "10. Protección de datos",
        body: [
          "El tratamiento de datos personales se rige por la Política de Privacidad publicada en /legal, conforme al RGPD y a la Ley Orgánica 3/2018. Cuando iCommunity actúe como encargado del tratamiento, se suscribirá el correspondiente contrato conforme al art. 28 del RGPD.",
        ],
      },
      {
        title: "11. Limitación de responsabilidad",
        body: [
          "En los términos permitidos por la normativa aplicable, la responsabilidad total de iCommunity frente al cliente por cualquier reclamación derivada del servicio se limitará al importe efectivamente satisfecho por el cliente durante los 12 meses anteriores al hecho causante. Esta limitación no será de aplicación en casos de dolo, negligencia grave o daños que no puedan ser excluidos por ley.",
        ],
      },
      {
        title: "12. Duración y resolución",
        body: [
          "La duración del contrato será la pactada. Cualquiera de las partes podrá resolver el contrato por incumplimiento grave de la otra parte, previo requerimiento con un plazo mínimo de 30 días para subsanar. En caso de resolución imputable a iCommunity, se reembolsarán los importes no consumidos.",
        ],
      },
      {
        title: "13. Modificaciones",
        body: [
          "iCommunity podrá modificar estas condiciones. Los cambios sustanciales se notificarán al usuario con una antelación mínima de 30 días, quien podrá resolver el contrato sin penalización si no acepta los nuevos términos.",
        ],
      },
      {
        title: "14. Resolución de disputas y ley aplicable",
        body: [
          "Las presentes condiciones se rigen por la legislación española y europea aplicable. Para consumidores, la Comisión Europea ofrece una plataforma de resolución de litigios en línea disponible en https://ec.europa.eu/consumers/odr. Con carácter general, las partes se someten a los Juzgados y Tribunales de Madrid, salvo que resulte imperativa la jurisdicción del domicilio del consumidor.",
        ],
      },
    ],
  },
  en: {
    seoTitle: "Terms of Service",
    seoDesc: "General terms of contract and use of the services of iCommunity Labs & Tech S.L., in accordance with European Union regulations.",
    h1: "Terms of Service",
    updated: "Last updated: 23 July 2026",
    sections: [
      {
        title: "1. Provider identification",
        body: [
          "iCommunity Labs & Tech S.L. (\"iCommunity\"), with registered office at calle Colmenares, 3 – Bajo Dcha, 28014 Madrid (Spain), VAT number B88350897, registered in the Madrid Commercial Registry. Contact: hello@icommunity.io.",
        ],
      },
      {
        title: "2. Purpose",
        body: [
          "These terms govern the contracting and use of the digital services provided by iCommunity, including its proprietary platforms (CertyPass, Privaro, MusicDibs) and related professional services. Acceptance of these terms is a mandatory requirement to access the services.",
        ],
      },
      {
        title: "3. Applicable legal framework",
        body: [
          "The contract is governed by: Spanish Law 34/2002 on Information Society and Electronic Commerce Services (LSSI-CE); Royal Legislative Decree 1/2007 (General Law for the Defence of Consumers and Users); Regulation (EU) 2016/679 (GDPR); Regulation (EU) 2022/2065 (Digital Services Act); and other applicable Spanish and European regulations.",
        ],
      },
      {
        title: "4. Contracting process",
        body: [
          "The user may contract the services through the website or through a signed commercial proposal. Before formalisation, iCommunity will provide the user with clear information about the main features of the service, the total price (including taxes), payment methods, contract duration and termination conditions.",
          "Once contracting is confirmed, iCommunity will send an order confirmation to the e-mail address provided by the user; this confirmation constitutes the contract between the parties.",
        ],
      },
      {
        title: "5. Prices and invoicing",
        body: [
          "All prices are stated in euros and include applicable VAT unless otherwise indicated. iCommunity will issue an electronic invoice in accordance with Royal Decree 1619/2012. Subscription services are invoiced in advance according to the contracted billing cycle.",
        ],
      },
      {
        title: "6. Right of withdrawal (consumers)",
        body: [
          "Where the customer is a consumer within the meaning of Article 3 of RLD 1/2007, they will have a period of 14 calendar days from the conclusion of the contract to withdraw from it without justification, in accordance with Articles 102 et seq. of RLD 1/2007.",
          "Withdrawal will not apply where the user has expressly requested the start of the service during the withdrawal period and the service has been fully performed, nor to digital content supplied on a non-tangible medium whose performance has begun with the user's prior express consent and acknowledgement of the loss of the right of withdrawal.",
          "The right of withdrawal is exercised by unequivocal notification to hello@icommunity.io, indicating the name, address and contract being withdrawn from. Amounts paid will be refunded in accordance with the Refund Policy.",
        ],
      },
      {
        title: "7. User obligations",
        body: [
          "The user undertakes to: (i) provide true and up-to-date information; (ii) make lawful use of the services; (iii) not to reverse-engineer, copy or reproduce the software without authorisation; (iv) keep access credentials confidential; (v) not to use the services for activities contrary to law, morals or public order.",
        ],
      },
      {
        title: "8. Service level and availability",
        body: [
          "iCommunity will make reasonable efforts to keep the services available 24/7, without prejudice to interruptions necessary for maintenance, updates or force majeure. Specific service levels, where applicable, will be detailed in the Service Level Agreement (SLA) signed with the customer.",
        ],
      },
      {
        title: "9. Intellectual property",
        body: [
          "All intellectual and industrial property rights over iCommunity's platforms, software, content, trademarks and materials belong exclusively to iCommunity or its licensors. Contracting the service does not imply the transfer of these rights, except for the limited, non-exclusive and non-transferable licence necessary to use the service.",
        ],
      },
      {
        title: "10. Data protection",
        body: [
          "The processing of personal data is governed by the Privacy Policy published at /legal, in accordance with the GDPR and Spanish Organic Law 3/2018. Where iCommunity acts as processor, the corresponding data processing agreement will be signed under Article 28 GDPR.",
        ],
      },
      {
        title: "11. Limitation of liability",
        body: [
          "To the extent permitted by applicable law, iCommunity's total liability to the customer for any claim arising from the service will be limited to the amount actually paid by the customer during the 12 months preceding the event giving rise to the claim. This limitation does not apply in cases of wilful misconduct, gross negligence or damages that cannot be excluded by law.",
        ],
      },
      {
        title: "12. Duration and termination",
        body: [
          "The duration of the contract will be as agreed. Either party may terminate the contract for material breach by the other, after a prior notice with a minimum period of 30 days to cure. In the event of termination attributable to iCommunity, unused amounts will be refunded.",
        ],
      },
      {
        title: "13. Amendments",
        body: [
          "iCommunity may amend these terms. Substantial changes will be notified to the user at least 30 days in advance; the user may terminate the contract without penalty if they do not accept the new terms.",
        ],
      },
      {
        title: "14. Dispute resolution and applicable law",
        body: [
          "These terms are governed by applicable Spanish and European law. For consumers, the European Commission provides an online dispute resolution platform at https://ec.europa.eu/consumers/odr. In general, the parties submit to the Courts and Tribunals of Madrid, unless the consumer's domicile jurisdiction is mandatory.",
        ],
      },
    ],
  },
};

const Terms = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <div className="min-h-screen bg-[hsl(225,30%,6%)] text-white/80">
      <PageSEO
        title={t.seoTitle}
        description={t.seoDesc}
        path="/terminos"
        lang={lang}
        jsonLd={[
          webPage({ path: "/terminos", name: t.seoTitle, description: t.seoDesc, lang }),
          breadcrumbs([
            { name: lang === "es" ? "Inicio" : "Home", path: "/" },
            { name: t.seoTitle, path: "/terminos" },
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

export default Terms;