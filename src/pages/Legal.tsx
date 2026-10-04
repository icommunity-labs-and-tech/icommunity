import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import ContactModal from "@/components/home/ContactModal";
import PageSEO from "@/components/PageSEO";
import { webPage, breadcrumbs, articleSchema, productList } from "@/lib/structuredData";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const content = {
  es: {
    seoTitle: "Aviso Legal",
    seoDesc: "Política de privacidad, aviso legal y política de cookies de iCommunity Labs & Tech S.L.",
    h1: "Política de Privacidad",
    legalTitle: "Aviso Legal",
    legalParas: [
      <>iCommunity Labs &amp; Tech S.L. (en adelante "iCommunity") es la titular del dominio, con domicilio social en Madrid, en la calle Colmenares, 3 – Bajo Dcha, con C.I.F. B88350897 e inscrita en el Registro Mercantil de Madrid al tomo 39.161, Folio 40, Sección 8, Hoja M-695696. Correo electrónico de contacto: <a href="mailto:hello@icommunity.io" className="text-blue-400 hover:underline">hello@icommunity.io</a>.</>,
      "El acceso y/o uso de este sitio web de iCommunity implica la aceptación expresa y sin reservas de las presentes condiciones que rogamos lea detenidamente. Si no estuviera de acuerdo con las condiciones de uso no acceda ni utilice este sitio web.",
      "Para mejorar y optimizar la experiencia del usuario, el sitio web de iCommunity utiliza \"cookies\". Encontrará información detallada sobre qué son las «Cookies», cómo puede desactivarlas en su navegador y cómo bloquear específicamente la instalación de cookies de terceros, en el siguiente enlace.",
      "iCommunity se reserva la facultad de llevar a cabo en cualquier momento y sin necesidad de preaviso, cualquier modificación de cuantos elementos integren el diseño, contenido y configuración de la web, ampliar o reducir servicios, o modificar las presentes condiciones generales. El acceso del usuario tras cualquier modificación supone la aceptación de los cambios que se realicen.",
      "iCommunity es titular, o cuenta con las licencias correspondientes en su caso, sobre los derechos de explotación de propiedad intelectual e industrial del sitio web, incluyendo todos los contenidos ofrecidos en el mismo. El acceso y/o utilización del sitio web por parte del usuario no implicará en ningún caso la renuncia, transmisión, licencia o cesión total o parcial de los anteriores derechos por parte de iCommunity.",
      "Quedan reservados todos los derechos de propiedad intelectual e industrial sobre los contenidos del sitio web y en particular quedan expresamente prohibidas la reproducción, la distribución y la comunicación pública, incluida su modalidad de puesta a disposición, de la totalidad o parte de los contenidos de esta página web, con fines comerciales, sin la autorización previa y por escrito de iCommunity.",
      "El usuario accede a la página web bajo su exclusiva responsabilidad. El Usuario se compromete a hacer un uso adecuado de los contenidos y servicios y, con carácter enunciativo pero no limitativo, a no emplearlos para incurrir en actividades ilícitas, ilegales o contrarias a la buena fe y al orden público.",
      <>Si el usuario tuviera conocimiento de la existencia de algún contenido ilícito, ilegal o contrario a las leyes, rogamos lo notifique a iCommunity a través de <a href="mailto:hello@icommunity.io" className="text-blue-400 hover:underline">hello@icommunity.io</a>.</>,
      "El presente aviso legal se rige por la Ley Española. Para cualquier controversia que pudiera suscitarse sobre interpretación y cumplimiento, nos sometemos a la jurisdicción de los Juzgados y Tribunales de Madrid.",
    ] as (string | JSX.Element)[],
    privacyTitle: "Política de Privacidad y Protección de datos",
    privacyParas: [
      <>El responsable del tratamiento de datos es iCommunity Labs &amp; Tech S.L. con domicilio social en Madrid, calle Colmenares, 3 – Bajo Dcha, C.I.F. B88350897 y correo electrónico de contacto: <a href="mailto:hello@icommunity.io" className="text-blue-400 hover:underline">hello@icommunity.io</a>.</>,
      "De conformidad con la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los Derechos Digitales, así como el Reglamento (UE) 2016/679 (RGPD), los datos que voluntariamente facilite el usuario serán tratados por iCommunity.",
      "El tratamiento de los datos tiene como finalidad dar curso a su solicitud y prestarle la información que solicite. Los datos también podrán ser utilizados para remitir boletines electrónicos de noticias o información de iCommunity que pudieran ser de su interés.",
      "El usuario manifiesta que los datos que facilita son verdaderos, completos y actualizados, siendo responsable de cualquier daño o perjuicio, directo o indirecto, que pudiera ocasionar su incumplimiento.",
      "Los datos personales facilitados serán conservados durante el plazo adecuado para la realización de las actividades para las que fueron recogidos y, posteriormente, durante los plazos legalmente establecidos.",
      <>El usuario podrá ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad mediante solicitud escrita a <a href="mailto:hello@icommunity.io" className="text-blue-400 hover:underline">hello@icommunity.io</a> o por correo postal a iCommunity Labs &amp; Tech S.L., calle Colmenares, 3 – Bajo Dcha, 28014 Madrid. Asimismo, podrá presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD).</>,
    ] as (string | JSX.Element)[],
    cookiesTitle: "Política de Cookies",
    cookiesIntro: "La presente política de cookies tiene por finalidad informarle de manera clara y precisa sobre las cookies que se utilizan en el sitio web de iCommunity Labs & Tech S.L.",
    what: "¿Qué son las cookies?",
    whatP: "Una cookie es un pequeño fragmento de texto que los sitios web que visita envían al navegador y que permite recordar información sobre su visita, como su idioma preferido y otras opciones, con el fin de facilitar su próxima visita y hacer que el sitio le resulte más útil.",
    types: "Tipos de cookies",
    typesParas: [
      "Según la entidad que gestione el dominio: cookies propias y de terceros.",
      "Según el plazo de tiempo que permanecen almacenadas: cookies de sesión o cookies persistentes.",
      "Según su finalidad: técnicas, de personalización, de análisis, publicitarias y de publicidad comportamental.",
    ],
    used: "Cookies utilizadas en el website",
    technical: "Cookies técnicas:",
    technicalP: "Permiten al usuario la navegación a través del sitio y la utilización de sus funcionalidades básicas (identificación de sesión, seguridad, preferencias, etc.).",
    personal: "Cookies de personalización:",
    personalP: "Permiten acceder al servicio con características predefinidas, como el idioma o la configuración regional.",
    accept: "Aceptación de la política de cookies",
    acceptP: "Pulsando el botón Entendido se asume que usted acepta el uso de cookies.",
    modify: "Cómo modificar la configuración de las cookies",
    modifyP: "Usted puede restringir, bloquear o borrar las cookies utilizando su navegador. En cada navegador la operativa es diferente; la función «Ayuda» le mostrará cómo hacerlo.",
    updates: "Actualizaciones y cambios",
    updatesP: "iCommunity se reserva el derecho de modificar esta Política de Cookies en función de exigencias legislativas o reglamentarias. Se aconseja a los usuarios que la visiten periódicamente.",
    date: "28 de junio de 2021",
    footer: "© iCommunity Labs & Tech S.L. Todos los derechos reservados.",
  },
  en: {
    seoTitle: "Legal Notice",
    seoDesc: "Privacy policy, legal notice and cookie policy of iCommunity Labs & Tech S.L.",
    h1: "Privacy Policy",
    legalTitle: "Legal Notice",
    legalParas: [
      <>iCommunity Labs &amp; Tech S.L. (hereinafter "iCommunity") is the owner of this domain, with registered office in Madrid, calle Colmenares, 3 – Bajo Dcha, VAT number B88350897, registered in the Madrid Commercial Registry, volume 39,161, folio 40, section 8, sheet M-695696. Contact e-mail: <a href="mailto:hello@icommunity.io" className="text-blue-400 hover:underline">hello@icommunity.io</a>.</>,
      "Accessing and/or using this website implies the express and unreserved acceptance of these terms, which we ask you to read carefully. If you do not agree with the terms of use, please do not access or use this website.",
      "To improve and optimise the user experience, iCommunity's website uses \"cookies\". You will find detailed information on what cookies are, how you can disable them in your browser and how to specifically block the installation of third-party cookies in the corresponding section below.",
      "iCommunity reserves the right to make, at any time and without prior notice, any modification to the design, content and configuration of the website, extend or reduce services, or modify these general terms. Continued access after any modification implies acceptance of the changes.",
      "iCommunity holds, or has the corresponding licences for, the intellectual and industrial property rights over the website and its contents. The user's access and/or use of the website will not imply any waiver, transfer, licence or assignment of such rights.",
      "All intellectual and industrial property rights over the website contents are reserved. In particular, reproduction, distribution and public communication (including making available) of all or part of the contents for commercial purposes is expressly forbidden without the prior written authorisation of iCommunity.",
      "The user accesses the website at their sole responsibility and undertakes to make appropriate use of its contents and services and not to use them for unlawful, illegal or bad-faith activities or activities contrary to public order.",
      <>If the user becomes aware of any unlawful, illegal or infringing content, please notify iCommunity at <a href="mailto:hello@icommunity.io" className="text-blue-400 hover:underline">hello@icommunity.io</a>.</>,
      "This legal notice is governed by Spanish law. For any dispute regarding its interpretation or enforcement, the parties submit to the jurisdiction of the Courts and Tribunals of Madrid.",
    ] as (string | JSX.Element)[],
    privacyTitle: "Privacy and Data Protection Policy",
    privacyParas: [
      <>The data controller is iCommunity Labs &amp; Tech S.L., with registered office in Madrid, calle Colmenares, 3 – Bajo Dcha, VAT number B88350897 and contact e-mail: <a href="mailto:hello@icommunity.io" className="text-blue-400 hover:underline">hello@icommunity.io</a>.</>,
      "In accordance with Spanish Organic Law 3/2018 of 5 December on the Protection of Personal Data and Guarantee of Digital Rights, as well as Regulation (EU) 2016/679 (GDPR), the data voluntarily provided by the user will be processed by iCommunity.",
      "Data is processed to respond to your request and provide the information you ask for. Data may also be used to send iCommunity newsletters or information that may be of interest to you.",
      "The user warrants that the data provided is true, complete and up to date, and is liable for any direct or indirect damage that may arise from non-compliance.",
      "Personal data will be retained for the period necessary to fulfil the purposes for which it was collected and, thereafter, for the legally required periods.",
      <>Users may exercise their rights of access, rectification, erasure, objection, restriction and portability by written request to <a href="mailto:hello@icommunity.io" className="text-blue-400 hover:underline">hello@icommunity.io</a> or by post to iCommunity Labs &amp; Tech S.L., calle Colmenares, 3 – Bajo Dcha, 28014 Madrid, Spain. Users also have the right to lodge a complaint with the Spanish Data Protection Agency (AEPD).</>,
    ] as (string | JSX.Element)[],
    cookiesTitle: "Cookie Policy",
    cookiesIntro: "This cookie policy aims to inform you clearly and precisely about the cookies used on the iCommunity Labs & Tech S.L. website.",
    what: "What are cookies?",
    whatP: "A cookie is a small text file that the websites you visit send to your browser, allowing the website to remember information about your visit — such as your preferred language and other settings — to make your next visit easier and the site more useful to you.",
    types: "Types of cookies",
    typesParas: [
      "Based on the entity managing the domain: first-party and third-party cookies.",
      "Based on how long they remain stored: session cookies or persistent cookies.",
      "Based on their purpose: technical, personalisation, analytics, advertising and behavioural advertising cookies.",
    ],
    used: "Cookies used on this website",
    technical: "Technical cookies:",
    technicalP: "Allow the user to navigate the site and use its basic features (session ID, security, preferences, etc.).",
    personal: "Personalisation cookies:",
    personalP: "Allow access to the service with pre-defined characteristics, such as language or regional settings.",
    accept: "Acceptance of the cookie policy",
    acceptP: "By clicking Accept, you agree to the use of cookies.",
    modify: "How to change your cookie settings",
    modifyP: "You can restrict, block or delete cookies using your browser. The procedure differs by browser; the \"Help\" function will show you how.",
    updates: "Updates and changes",
    updatesP: "iCommunity reserves the right to modify this Cookie Policy in accordance with legislative or regulatory requirements. Users are advised to visit it periodically.",
    date: "28 June 2021",
    footer: "© iCommunity Labs & Tech S.L. All rights reserved.",
  },
};

const Legal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <div className="min-h-screen bg-[hsl(225,30%,6%)] text-white/80">
      <PageSEO
        title={t.seoTitle}
        description={t.seoDesc}
        path="/legal"
        lang={lang}
        jsonLd={[
          webPage({ path: "/legal", name: t.seoTitle, description: t.seoDesc, lang }),
          breadcrumbs([
            { name: lang === "es" ? "Inicio" : "Home", path: "/" },
            { name: t.seoTitle, path: "/legal" },
          ]),
        ]}
      />
      <Navbar onOpenModal={() => setModalOpen(true)} />
      <ContactModal open={modalOpen} onOpenChange={setModalOpen} />

      <main className="ic-container pt-28 pb-20">
        <article className="max-w-3xl mx-auto space-y-12 text-sm leading-relaxed">
          <h1 className="text-3xl md:text-4xl font-bold text-white">{t.h1}</h1>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-2">{t.legalTitle}</h2>
            {t.legalParas.map((p, i) => <p key={i}>{p}</p>)}
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-2">{t.privacyTitle}</h2>
            {t.privacyParas.map((p, i) => <p key={i}>{p}</p>)}
          </section>

          <section id="cookies" className="space-y-4">
            <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-2">{t.cookiesTitle}</h2>
            <p>{t.cookiesIntro}</p>
            <h3 className="text-base font-semibold text-white/90 pt-2">{t.what}</h3>
            <p>{t.whatP}</p>
            <h3 className="text-base font-semibold text-white/90 pt-2">{t.types}</h3>
            {t.typesParas.map((p, i) => <p key={i}>{p}</p>)}
            <h3 className="text-base font-semibold text-white/90 pt-2">{t.used}</h3>
            <p><strong className="text-white/90">{t.technical}</strong> {t.technicalP}</p>
            <p><strong className="text-white/90">{t.personal}</strong> {t.personalP}</p>
            <h3 className="text-base font-semibold text-white/90 pt-2">{t.accept}</h3>
            <p>{t.acceptP}</p>
            <h3 className="text-base font-semibold text-white/90 pt-2">{t.modify}</h3>
            <p>{t.modifyP}</p>
            <h3 className="text-base font-semibold text-white/90 pt-2">{t.updates}</h3>
            <p>{t.updatesP}</p>
            <p className="text-white/40 pt-4">{t.date}</p>
          </section>

          <div className="border-t border-white/10 pt-6 text-center text-xs text-white/30">{t.footer}</div>
        </article>
      </main>

      <Footer onOpenModal={() => setModalOpen(true)} />
    </div>
  );
};

export default Legal;
