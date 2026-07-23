import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import ContactModal from "@/components/home/ContactModal";
import PageSEO from "@/components/PageSEO";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import logoPrtrNextgen from "@/assets/logo-prtr-nextgen.webp";
import logoDatiaFeder from "@/assets/logo-datia-feder.webp";
import logoCdtiCervera from "@/assets/logo-cdti-cervera.png";
import logoNeotecCdti from "@/assets/logo-neotec-cdti.jpg";
import logoCofinanciadoUe from "@/assets/logo-cofinanciado-ue.jpg";
import logoFondosEuropeos from "@/assets/logo-fondos-europeos.jpg";
import logoFse from "@/assets/logo-fse.jpg";

const content = {
  es: {
    seoTitle: "Proyectos Cofinanciados",
    seoDesc: "Proyectos financiados a nivel europeo y nacional: PRTR 2025, DATIA, Cervera, NEOTEC y programas de empleo joven.",
    h1: "Proyectos Cofinanciados",
    sections: {
      prtr: {
        title: "Proyecto de Caso de Uso Blockchain – PRTR 2025",
        p1: "iCommunity Labs, S.L. ha sido beneficiaria de la subvención correspondiente a la convocatoria de ayudas dirigidas al desarrollo de casos de uso Blockchain, convocada por la Consejería de Digitalización de la Comunidad de Madrid en el marco del Componente 13, Inversión 1 del Plan de Recuperación, Transformación y Resiliencia.",
        bullets: [
          "Número de expediente: 03-CUB1-00026.3/2025",
          "Importe de la subvención concedida: 99.892,37 €",
          "Convocatoria: Orden 235/2025, de 13 de agosto",
          "Programa: Redes territoriales de especialización tecnológica",
        ],
        p2: "La actuación ha permitido el desarrollo de soluciones avanzadas basadas en tecnología blockchain aplicadas a la certificación y trazabilidad digital.",
        alt: "Financiado por la Unión Europea – NextGenerationEU · Plan de Recuperación, Transformación y Resiliencia",
        caption: "Proyecto financiado por la Unión Europea – NextGenerationEU en el marco del Plan de Recuperación, Transformación y Resiliencia.",
      },
      datia: {
        title: "Proyecto DATIA (Consorcio 2024) – Cofinanciación FEDER 2021–2027",
        p1: "iCommunity Labs, S.L. participa como entidad beneficiaria en el CONSORCIO 2024 DATIA, en el marco de la convocatoria 2024 de ayudas para proyectos de innovación tecnológica de efecto tractor en consorcio, cofinanciadas por el Fondo Europeo de Desarrollo Regional (FEDER) dentro del Programa Operativo FEDER de la Comunidad de Madrid 2021–2027.",
        h3: "Importes aprobados (según Orden de concesión)",
        bullets: [
          "Inversión subvencionable (iCommunity): 413.140,93 € (A1: 124.219,84 € · A2: 231.412,18 € · A3: 57.508,91 €)",
          "Orden+Concesión+Hubs+2024",
          "Importe máximo de la ayuda concedida (iCommunity): 277.438,72 € (A1: 99.375,87 € · A2: 132.055,72 € · A3: 46.007,13 €)",
          "Intensidad máxima de ayuda: 80%",
        ],
        p2: "Este proyecto contribuye a la mejora de la cooperación público-privada en I+D+i en la Comunidad de Madrid, conforme a la Orden de concesión correspondiente.",
        alt: "Comunidad de Madrid · Fondos Europeos · Cofinanciado por la Unión Europea – FEDER 2021-2027",
        caption: "Proyecto parcialmente financiado por el Fondo Europeo de Desarrollo Regional (FEDER) en el marco del Programa Operativo Comunidad de Madrid 2021–2027.",
      },
      cervera: {
        title: 'Proyectos de I+D de Transferencia Tecnológica "Cervera"',
        meta: [
          "Nº: Proyecto IDI-20200143",
          "Título: ICOMMUNITY BLOCKCHAIN SOLUTIONS",
          "Entidad: B-88350897 ICOMMUNITY LABS & TECH SL",
          "Presupuesto concedido: 298,395.70€",
        ],
        p1: "El objetivo del proyecto Cervera, es la financiación de proyectos individuales de I+D desarrollados por empresas que colaboren con Centros Tecnológicos de ámbito estatal en las tecnologías prioritarias Cervera.",
        p2Prefix: "Esta financiación ha permitido a iCommunity Labs completar el desarrollo de la plataforma IBS, colaborando junto con el ",
        p2Bold: "Centro Tecnológico EURECAT",
        p2Mid: " de Barcelona en la investigación de soluciones técnicas encaminadas hacia la resolución de la ",
        p2Bold2: "interoperabilidad",
        p2Suffix: " entre las cadenas de bloques/DLTs.",
        alt: "CDTI – Red Cervera",
        caption: 'Proyecto financiado por el Centro para el Desarrollo Tecnológico Industrial (CDTI) en el marco del programa de Transferencia Tecnológica "Cervera".',
      },
      neotec: {
        title: "Programa NEOTEC",
        meta: [
          "Expediente: EXP 00135216 / SNEO-20201073",
          "Título: TECNOLOGÍA DE SEGURIDAD MEDIANTE ALGORITMOS DE ENCRIPTACIÓN E IDENTIDAD TOKENIZADA PARA EL ALMACENAMIENTO DE DATOS EN REDES IPFS Y BLOCKCHAIN.",
          "Entidad: B-88350897 ICOMMUNITY LABS & TECH SL",
          "Presupuesto concedido: 250.000€",
        ],
        p1: "El objetivo del programa NEOTEC, es la financiación de la puesta en marcha de nuevos proyectos empresariales, que requieran el uso de tecnologías o conocimientos desarrollados a partir de la actividad investigadora y en los que la estrategia de negocio se base en el desarrollo de tecnología.",
        p2: "Esta financiación ha facilitado a iCommunity Labs desarrollar su tecnología de seguridad mediante algoritmos de encriptación e identidad tokenizada para el almacenamiento de datos en redes IPFS y blockchain. Esto incluye la creación de un módulo de identidad digital unificada basado en algoritmos de prueba conocimiento cero o zero knowledge proof (ZKP) que nos permitirán reducir los datos personales que se comparten con terceros y mejorar la privacidad de los mismos gracias a técnicas de criptografía avanzadas.",
        alt: "CDTI – Programa NEOTEC",
        caption: "Proyecto financiado por el Centro para el Desarrollo Tecnológico Industrial (CDTI) en el marco del programa NEOTEC.",
      },
      youth: {
        title: "Programa para el Fomento de la Contratación para Jóvenes en la Comunidad de Madrid",
        meta: [
          "No Expediente: 09-GCE1-02346.6/2024",
          "Beneficiario: iCommunity Labs y Tech SL",
          "Programa: Fomento de la contratación en el ámbito de la Comunidad de Madrid.",
          "Línea: Contratación estable de personas jóvenes.",
        ],
        p1: "ICOMMUNITY LABS & TECH, S.L. ha recibido una ayuda para la contratación estable de jóvenes, del programa para el fomento de la contratación en el ámbito de la Comunidad de Madrid.",
        caption: "Proyecto cofinanciado por el Fondo Social Europeo de la Unión Europea.",
      },
    },
  },
  en: {
    seoTitle: "Funded Projects",
    seoDesc: "European and national funded projects: PRTR 2025, DATIA, Cervera, NEOTEC and youth employment programs.",
    h1: "Co-funded Projects",
    sections: {
      prtr: {
        title: "Blockchain Use Case Project – PRTR 2025",
        p1: "iCommunity Labs, S.L. has been awarded a grant under the call for aid aimed at the development of Blockchain use cases, launched by the Regional Ministry of Digitalisation of the Community of Madrid within the framework of Component 13, Investment 1 of the Recovery, Transformation and Resilience Plan.",
        bullets: [
          "File number: 03-CUB1-00026.3/2025",
          "Grant amount: €99,892.37",
          "Call: Order 235/2025, of 13 August",
          "Programme: Regional networks for technological specialisation",
        ],
        p2: "This action has enabled the development of advanced solutions based on blockchain technology applied to digital certification and traceability.",
        alt: "Funded by the European Union – NextGenerationEU · Recovery, Transformation and Resilience Plan",
        caption: "Project funded by the European Union – NextGenerationEU under the Recovery, Transformation and Resilience Plan.",
      },
      datia: {
        title: "DATIA Project (Consortium 2024) – ERDF 2021–2027 co-financing",
        p1: "iCommunity Labs, S.L. participates as a beneficiary entity in the DATIA CONSORTIUM 2024, under the 2024 call for aid for technological innovation projects with driver effect in consortium, co-financed by the European Regional Development Fund (ERDF) within the ERDF Operational Programme of the Community of Madrid 2021–2027.",
        h3: "Approved amounts (per grant order)",
        bullets: [
          "Eligible investment (iCommunity): €413,140.93 (A1: €124,219.84 · A2: €231,412.18 · A3: €57,508.91)",
          "Order+Grant+Hubs+2024",
          "Maximum aid amount granted (iCommunity): €277,438.72 (A1: €99,375.87 · A2: €132,055.72 · A3: €46,007.13)",
          "Maximum aid intensity: 80%",
        ],
        p2: "This project contributes to strengthening public-private cooperation in R&D&I in the Community of Madrid, in accordance with the corresponding grant order.",
        alt: "Community of Madrid · European Funds · Co-funded by the European Union – ERDF 2021-2027",
        caption: "Project partially funded by the European Regional Development Fund (ERDF) under the Operational Programme of the Community of Madrid 2021–2027.",
      },
      cervera: {
        title: '"Cervera" Technology Transfer R&D Projects',
        meta: [
          "No.: Project IDI-20200143",
          "Title: ICOMMUNITY BLOCKCHAIN SOLUTIONS",
          "Entity: B-88350897 ICOMMUNITY LABS & TECH SL",
          "Approved budget: €298,395.70",
        ],
        p1: "The purpose of the Cervera programme is to finance individual R&D projects developed by companies in collaboration with national Technology Centres in the Cervera priority technologies.",
        p2Prefix: "This funding has enabled iCommunity Labs to complete the development of the IBS platform, in collaboration with the ",
        p2Bold: "EURECAT Technology Centre",
        p2Mid: " of Barcelona, researching technical solutions aimed at solving ",
        p2Bold2: "interoperability",
        p2Suffix: " between blockchains/DLTs.",
        alt: "CDTI – Cervera Network",
        caption: 'Project funded by the Centre for Industrial Technological Development (CDTI) under the "Cervera" Technology Transfer programme.',
      },
      neotec: {
        title: "NEOTEC Programme",
        meta: [
          "File: EXP 00135216 / SNEO-20201073",
          "Title: SECURITY TECHNOLOGY BASED ON ENCRYPTION ALGORITHMS AND TOKENISED IDENTITY FOR DATA STORAGE IN IPFS AND BLOCKCHAIN NETWORKS.",
          "Entity: B-88350897 ICOMMUNITY LABS & TECH SL",
          "Approved budget: €250,000",
        ],
        p1: "The purpose of the NEOTEC programme is to finance the launch of new business projects that require the use of technologies or knowledge developed from research activity and whose business strategy is based on technology development.",
        p2: "This funding has enabled iCommunity Labs to develop its security technology based on encryption algorithms and tokenised identity for data storage in IPFS and blockchain networks. This includes the creation of a unified digital identity module based on zero knowledge proof (ZKP) algorithms, allowing us to reduce the personal data shared with third parties and improve privacy through advanced cryptographic techniques.",
        alt: "CDTI – NEOTEC Programme",
        caption: "Project funded by the Centre for Industrial Technological Development (CDTI) under the NEOTEC programme.",
      },
      youth: {
        title: "Programme for the Promotion of Youth Employment in the Community of Madrid",
        meta: [
          "File No.: 09-GCE1-02346.6/2024",
          "Beneficiary: iCommunity Labs y Tech SL",
          "Programme: Promotion of employment in the Community of Madrid.",
          "Line: Stable hiring of young people.",
        ],
        p1: "ICOMMUNITY LABS & TECH, S.L. has received aid for the stable hiring of young people under the programme for the promotion of employment in the Community of Madrid.",
        caption: "Project co-financed by the European Social Fund of the European Union.",
      },
    },
  },
};

const Financiacion = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { lang } = useLanguage();
  const t = content[lang];
  const s = t.sections;

  return (
    <div className="min-h-screen bg-[hsl(225,30%,6%)] text-white/80">
      <PageSEO
        title={t.seoTitle}
        description={t.seoDesc}
        path="/financiacion"
        lang={lang}
      />
      <Navbar onOpenModal={() => setModalOpen(true)} />
      <ContactModal open={modalOpen} onOpenChange={setModalOpen} />

      <main className="ic-container pt-28 pb-20">
        <article className="max-w-3xl mx-auto space-y-16 text-sm leading-relaxed">
          <h1 className="text-3xl md:text-4xl font-bold text-white">{t.h1}</h1>

          <section className="space-y-4 border border-white/10 rounded-xl p-6 md:p-8 bg-white/[0.02]">
            <h2 className="text-xl font-semibold text-white">{s.prtr.title}</h2>
            <p>{s.prtr.p1}</p>
            <ul className="list-disc list-inside space-y-1 text-white/70">
              {s.prtr.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
            <p>{s.prtr.p2}</p>
            <div className="flex justify-center pt-8 pb-2">
              <img src={logoPrtrNextgen} alt={s.prtr.alt} className="w-full rounded-xl bg-white px-10 py-8 shadow-xl" />
            </div>
            <p className="text-xs text-white/40 text-center pt-2">{s.prtr.caption}</p>
          </section>

          <section className="space-y-4 border border-white/10 rounded-xl p-6 md:p-8 bg-white/[0.02]">
            <h2 className="text-xl font-semibold text-white">{s.datia.title}</h2>
            <p>{s.datia.p1}</p>
            <h3 className="text-base font-semibold text-white">{s.datia.h3}</h3>
            <ul className="list-disc list-inside space-y-1 text-white/70">
              {s.datia.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
            <p>{s.datia.p2}</p>
            <div className="flex justify-center pt-8 pb-2">
              <img src={logoDatiaFeder} alt={s.datia.alt} className="w-full rounded-xl bg-white px-10 py-8 shadow-xl" />
            </div>
            <p className="text-xs text-white/40 text-center pt-2">{s.datia.caption}</p>
          </section>

          <section className="space-y-4 border border-white/10 rounded-xl p-6 md:p-8 bg-white/[0.02]">
            <h2 className="text-xl font-semibold text-white">{s.cervera.title}</h2>
            <div className="space-y-1 text-white/60">
              {s.cervera.meta.map((m, i) => <p key={i}>{m}</p>)}
            </div>
            <p>{s.cervera.p1}</p>
            <p>
              {s.cervera.p2Prefix}
              <strong className="text-white">{s.cervera.p2Bold}</strong>
              {s.cervera.p2Mid}
              <strong className="text-white">{s.cervera.p2Bold2}</strong>
              {s.cervera.p2Suffix}
            </p>
            <div className="flex justify-center pt-8 pb-2">
              <img src={logoCdtiCervera} alt={s.cervera.alt} className="max-w-xs mx-auto rounded-xl bg-white px-8 py-6 shadow-xl" />
            </div>
            <p className="text-xs text-white/40 text-center pt-2">{s.cervera.caption}</p>
          </section>

          <section className="space-y-4 border border-white/10 rounded-xl p-6 md:p-8 bg-white/[0.02]">
            <h2 className="text-xl font-semibold text-white">{s.neotec.title}</h2>
            <div className="space-y-1 text-white/60">
              {s.neotec.meta.map((m, i) => <p key={i}>{m}</p>)}
            </div>
            <p>{s.neotec.p1}</p>
            <p>{s.neotec.p2}</p>
            <div className="flex justify-center pt-8 pb-2">
              <img src={logoNeotecCdti} alt={s.neotec.alt} className="max-w-xs mx-auto rounded-xl bg-white px-8 py-6 shadow-xl" />
            </div>
            <p className="text-xs text-white/40 text-center pt-2">{s.neotec.caption}</p>
          </section>

          <section className="space-y-4 border border-white/10 rounded-xl p-6 md:p-8 bg-white/[0.02]">
            <h2 className="text-xl font-semibold text-white">{s.youth.title}</h2>
            <div className="space-y-1 text-white/60">
              {s.youth.meta.map((m, i) => <p key={i}>{m}</p>)}
            </div>
            <p>{s.youth.p1}</p>
            <div className="flex flex-wrap justify-center items-center gap-6 pt-8 pb-2">
              <img src={logoFondosEuropeos} alt="European Funds logo" className="h-16 rounded bg-white px-4 py-2 shadow-lg" />
              <img src={logoCofinanciadoUe} alt="Co-funded by the European Union logo" className="h-16 rounded bg-white px-4 py-2 shadow-lg" />
              <img src={logoFse} alt="European Social Fund logo" className="h-16 rounded bg-white px-4 py-2 shadow-lg" />
            </div>
            <p className="text-xs text-white/40 text-center pt-2">{s.youth.caption}</p>
          </section>
        </article>
      </main>

      <Footer onOpenModal={() => setModalOpen(true)} />
    </div>
  );
};

export default Financiacion;
