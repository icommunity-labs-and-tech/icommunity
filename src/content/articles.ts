// Bilingual SEO content for the /recursos section.
// Each article targets a generic search term where iCommunity already ranks
// on pages 3–5 according to Google Search Console data.

export type Lang = "en" | "es";

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface Article {
  slug: string;
  date: string;
  readingMinutes: number;
  category: Record<Lang, string>;
  title: Record<Lang, string>;
  description: Record<Lang, string>;
  intro: Record<Lang, string[]>;
  sections: Record<Lang, ArticleSection[]>;
  cta: Record<Lang, { text: string; button: string }>;
}

export const articles: Article[] = [
  {
    slug: "casos-de-uso-blockchain",
    date: "2026-10-04",
    readingMinutes: 8,
    category: { es: "Guía", en: "Guide" },
    title: {
      es: "Casos de uso de blockchain para empresas: guía práctica",
      en: "Blockchain use cases for business: a practical guide",
    },
    description: {
      es: "Los principales casos de uso de blockchain en empresas: trazabilidad, tokenización de pagos, propiedad intelectual, inmobiliario y sector público.",
      en: "The main blockchain use cases for companies: traceability, payment tokenization, intellectual property, real estate and the public sector.",
    },
    intro: {
      es: [
        "Blockchain dejó de ser una tecnología experimental para convertirse en una capa de infraestructura de confianza. Aun así, muchas empresas siguen preguntándose dónde aporta valor real y dónde es solo un coste innecesario.",
        "La regla es sencilla: blockchain tiene sentido cuando varias partes que no confían plenamente entre sí necesitan compartir un registro verificable y que nadie pueda alterar. Si solo hay una parte implicada, una base de datos convencional suele bastar. Estos son los casos de uso donde la tecnología ya demuestra retorno medible.",
      ],
      en: [
        "Blockchain is no longer experimental technology; it has become a trust infrastructure layer. Even so, many companies still wonder where it delivers real value and where it is just unnecessary cost.",
        "The rule is simple: blockchain makes sense when several parties that do not fully trust each other need to share a verifiable record that no one can alter. If only one party is involved, a conventional database is usually enough. These are the use cases where the technology already shows measurable returns.",
      ],
    },
    sections: {
      es: [
        {
          heading: "Trazabilidad y certificación de productos",
          paragraphs: [
            "La normativa europea ESPR obliga a que muchos productos lleven un Pasaporte Digital de Producto (DPP): un registro electrónico con su origen, composición y ciclo de vida. Blockchain es el soporte natural para este pasaporte, porque cada evidencia queda sellada de forma inmutable y cualquier actor de la cadena —fabricante, distribuidor, auditor o consumidor— puede verificarla sin depender de la palabra de un tercero.",
            "Más allá del cumplimiento regulatorio, la trazabilidad certificada reduce el fraude en cadenas de suministro y permite acreditar afirmaciones de sostenibilidad con evidencia verificable en lugar de declaraciones.",
          ],
        },
        {
          heading: "Tokenización de pagos",
          paragraphs: [
            "Tokenizar un pago significa representarlo como un activo digital registrable y trazable de extremo a extremo. El resultado: menos fricción en la conciliación, menos fraude y una pista de auditoría automática que sustituye los procesos manuales de verificación entre empresas.",
            "En entornos regulados, la tokenización se combina con infraestructuras de anonimización y cumplimiento (como Privaro) para que los pagos sean trazables para el auditor y privados para el usuario.",
          ],
        },
        {
          heading: "Propiedad intelectual y royalties",
          paragraphs: [
            "Registrar la autoría de una obra con sello de tiempo verificable convierte una declaración en evidencia. En la industria musical, plataformas como MusicDibs permiten certificar la propiedad de una canción en minutos y automatizar el reparto de royalties entre titulares mediante contratos inteligentes.",
            "El mismo patrón aplica a cualquier activo intangible: software, diseños, datos o modelos de IA cuya autoría y licencias necesitan demostrarse ante terceros.",
          ],
        },
        {
          heading: "Tokenización de activos inmobiliarios",
          paragraphs: [
            "Representar un inmueble como tokens permite fraccionar la propiedad, abrir la inversión a perfiles que antes quedaban fuera y dar liquidez a un mercado tradicionalmente ilíquido. Cada transferencia queda registrada y verificable, reduciendo costes notariales y de registro.",
            "El marco europeo MiCA y la normativa española de crowdfunding han aclarado el terreno de juego, y es uno de los sectores con mayor tracción actual. Lo desarrollamos en detalle en nuestra guía de tokenización inmobiliaria.",
          ],
        },
        {
          heading: "Administración pública y licitaciones",
          paragraphs: [
            "Los procesos públicos exigen trazabilidad total: quién presentó qué, cuándo y con qué contenido. Un registro blockchain garantiza que ninguna presentación pueda modificarse a posteriori y que toda auditoría pueda verificarse de forma independiente.",
            "Para administraciones y empresas que licitan con el sector público, esto se traduce en menos disputas, menos recursos anulados y procesos más rápidos.",
          ],
        },
        {
          heading: "Cómo elegir el caso de uso adecuado",
          paragraphs: [
            "Antes de invertir en blockchain, conviene validar que el proyecto cumple estos criterios:",
          ],
          bullets: [
            "Intervienen varias partes sin confianza plena entre sí.",
            "Se necesita demostrar integridad de los datos ante un auditor o tercero.",
            "El registro debe ser inmutable y verificable a lo largo del tiempo.",
            "Existe un requisito regulatorio o de evidencia trazable (ESPR, MiCA, RGPD).",
          ],
        },
      ],
      en: [
        {
          heading: "Product traceability and certification",
          paragraphs: [
            "The European ESPR regulation requires many products to carry a Digital Product Passport (DPP): an electronic record of their origin, composition and lifecycle. Blockchain is the natural backbone for this passport, because every piece of evidence is sealed immutably and any actor in the chain —manufacturer, distributor, auditor or consumer— can verify it without relying on a third party's word.",
            "Beyond regulatory compliance, certified traceability reduces fraud in supply chains and makes it possible to back sustainability claims with verifiable evidence instead of declarations.",
          ],
        },
        {
          heading: "Payment tokenization",
          paragraphs: [
            "Tokenizing a payment means representing it as a digital asset that is registrable and traceable end to end. The result: less friction in reconciliation, less fraud, and an automatic audit trail that replaces manual inter-company verification processes.",
            "In regulated environments, tokenization is combined with anonymization and compliance infrastructure (such as Privaro) so payments are traceable for the auditor and private for the user.",
          ],
        },
        {
          heading: "Intellectual property and royalties",
          paragraphs: [
            "Registering the authorship of a work with a verifiable timestamp turns a declaration into evidence. In the music industry, platforms like MusicDibs certify song ownership in minutes and automate royalty distribution between rights holders through smart contracts.",
            "The same pattern applies to any intangible asset: software, designs, data or AI models whose authorship and licences need to be proven to third parties.",
          ],
        },
        {
          heading: "Real estate asset tokenization",
          paragraphs: [
            "Representing a property as tokens makes it possible to fractionalize ownership, open investment to profiles that were previously excluded, and bring liquidity to a traditionally illiquid market. Every transfer is recorded and verifiable, cutting notarial and registration costs.",
            "The European MiCA framework and Spanish crowdfunding regulation have clarified the landscape, and real estate is one of the fastest-moving sectors today. We cover it in depth in our real estate tokenization guide.",
          ],
        },
        {
          heading: "Public sector and procurement",
          paragraphs: [
            "Public processes demand full traceability: who submitted what, when and with which content. A blockchain registry guarantees that no submission can be modified after the fact and that every audit can be verified independently.",
            "For administrations and companies bidding in public procurement, this means fewer disputes, fewer annulled tenders and faster processes.",
          ],
        },
        {
          heading: "How to choose the right use case",
          paragraphs: ["Before investing in blockchain, validate that your project meets these criteria:"],
          bullets: [
            "Several parties are involved, without full mutual trust.",
            "Data integrity must be provable to an auditor or third party.",
            "The record must be immutable and verifiable over time.",
            "There is a regulatory or traceable-evidence requirement (ESPR, MiCA, GDPR).",
          ],
        },
      ],
    },
    cta: {
      es: {
        text: "En iCommunity construimos la capa de confianza que hacen posibles estos casos de uso. Cuéntanos tu proyecto y te diremos si blockchain aporta valor real en tu caso.",
        button: "Solicitar demo",
      },
      en: {
        text: "At iCommunity we build the trust layer that makes these use cases possible. Tell us about your project and we will tell you whether blockchain adds real value in your case.",
        button: "Request demo",
      },
    },
  },
  {
    slug: "tokenizacion-de-pagos",
    date: "2026-10-04",
    readingMinutes: 7,
    category: { es: "Pagos", en: "Payments" },
    title: {
      es: "Tokenización de pagos con blockchain: cómo funciona",
      en: "Blockchain payment tokenization: how it works",
    },
    description: {
      es: "Qué es la tokenización de pagos, cómo funciona con blockchain y qué beneficios aporta: menos fraude, conciliación automática y trazabilidad total.",
      en: "What payment tokenization is, how it works with blockchain, and its benefits: less fraud, automatic reconciliation and full traceability.",
    },
    intro: {
      es: [
        "Cada pago entre empresas esconde un proceso manual invisible: verificar que lo recibido coincide con lo acordido, conciliar extractos, resolver discrepancias y conservar evidencia para auditorías. La tokenización de pagos digitaliza esa capa de confianza.",
        "En este artículo explicamos qué es exactamente, cómo funciona con blockchain y por qué está emergiendo como el patrón de referencia para pagos B2B y flujos de ingresos recurrentes.",
      ],
      en: [
        "Every payment between companies hides an invisible manual process: verifying that what was received matches what was agreed, reconciling statements, resolving discrepancies and keeping evidence for audits. Payment tokenization digitizes that trust layer.",
        "In this article we explain what it is exactly, how it works with blockchain, and why it is emerging as the reference pattern for B2B payments and recurring revenue flows.",
      ],
    },
    sections: {
      es: [
        {
          heading: "Qué es la tokenización de pagos",
          paragraphs: [
            "Tokenizar un pago consiste en representarlo como un token: un activo digital único que encapsula toda la información relevante —importe, emisor, receptor, condiciones, referencia contractual— y cuyo ciclo de vida queda registrado en un libro mayor compartido.",
            "El token no sustituye al dinero: lo acompaña. Actúa como representación verificable del pago y de sus condiciones, de modo que cualquier parte autorizada puede comprobar su estado sin acceder a sistemas ajenos.",
          ],
        },
        {
          heading: "Cómo funciona en la práctica",
          paragraphs: [
            "El flujo típico tiene cuatro pasos. Primero, las condiciones del pago se codifican en un contrato inteligente. Segundo, al ejecutarse el pago se emite el token y se sella en blockchain con sello de tiempo. Tercero, cada evento posterior (liberación de fondos, retención, devolución) se registra sobre el mismo token. Cuarto, auditor y regulador pueden verificar el historial completo sin pedir extractos a nadie.",
          ],
          bullets: [
            "Contrato inteligente con las condiciones acordadas.",
            "Emisión del token con sello de tiempo verificable.",
            "Registro inmutable de cada evento del ciclo de vida.",
            "Verificación independiente por auditor o regulador.",
          ],
        },
        {
          heading: "Beneficios medibles",
          paragraphs: [
            "Los beneficios se agrupan en tres bloques. Reducción de fraude: cada pago es único, trazable y no repudiable, lo que elimina los vectores de ataque más comunes en transferencias B2B. Conciliación automática: al compartir todos los participantes el mismo registro, desaparecen las discrepancias entre extractos y los procesos manuales de cuadre. Auditoría continua: la evidencia existe desde el primer momento, no se reconstruye a posteriori.",
            "En sectores con royalties, comisiones o pagos condicionados, el contrato inteligente puede además distribuir automáticamente cada ingreso entre los titulares, eliminando retrasos y errores de reparto.",
          ],
        },
        {
          heading: "Cumplimiento normativo: MiCA y privacidad",
          paragraphs: [
            "El reglamento europeo MiCA ha traído claridad jurídica a los activos digitales, y la tokenización de pagos se beneficia directamente: existe un marco reconocido para emitir y operar tokens dentro de la UE.",
            "El otro pilar es la privacidad. Trazable no significa expuesto: combinando tokenización con infraestructuras de anonimización y minimización de datos (como Privaro), el pago es verificable para el auditor pero los datos personales del pagador quedan protegidos conforme al RGPD.",
          ],
        },
        {
          heading: "Por dónde empezar",
          paragraphs: [
            "El camino más corto es identificar un flujo de pagos con alta fricción de conciliación o riesgo de fraude, y tokenizarlo en un entorno controlado antes de escalar. iCommunity proporciona la capa de infraestructura de confianza sobre la que construir ese flujo, con pasarelas de cumplimiento integradas.",
          ],
        },
      ],
      en: [
        {
          heading: "What payment tokenization is",
          paragraphs: [
            "Tokenizing a payment means representing it as a token: a unique digital asset that encapsulates all relevant information —amount, issuer, receiver, conditions, contractual reference— and whose lifecycle is recorded on a shared ledger.",
            "The token does not replace money: it accompanies it. It acts as a verifiable representation of the payment and its conditions, so any authorized party can check its status without accessing third-party systems.",
          ],
        },
        {
          heading: "How it works in practice",
          paragraphs: [
            "The typical flow has four steps. First, payment conditions are encoded in a smart contract. Second, when the payment executes, the token is issued and sealed on-chain with a verifiable timestamp. Third, every subsequent event (fund release, hold, refund) is recorded against the same token. Fourth, auditors and regulators can verify the full history without requesting statements from anyone.",
          ],
          bullets: [
            "Smart contract encoding the agreed conditions.",
            "Token issuance with a verifiable timestamp.",
            "Immutable record of every lifecycle event.",
            "Independent verification by auditor or regulator.",
          ],
        },
        {
          heading: "Measurable benefits",
          paragraphs: [
            "Benefits fall into three groups. Fraud reduction: every payment is unique, traceable and non-repudiable, eliminating the most common attack vectors in B2B transfers. Automatic reconciliation: because all participants share the same record, discrepancies between statements and manual matching processes disappear. Continuous audit: evidence exists from the very first moment instead of being reconstructed after the fact.",
            "In industries with royalties, commissions or conditional payments, the smart contract can also distribute every incoming amount automatically among rights holders, eliminating distribution delays and errors.",
          ],
        },
        {
          heading: "Regulatory compliance: MiCA and privacy",
          paragraphs: [
            "The European MiCA regulation has brought legal clarity to digital assets, and payment tokenization benefits directly: there is now a recognized framework for issuing and operating tokens within the EU.",
            "The other pillar is privacy. Traceable does not mean exposed: by combining tokenization with anonymization and data-minimization infrastructure (such as Privaro), the payment is verifiable for the auditor while the payer's personal data stays GDPR-compliant.",
          ],
        },
        {
          heading: "Where to start",
          paragraphs: [
            "The shortest path is to identify a payment flow with high reconciliation friction or fraud risk, and tokenize it in a controlled environment before scaling. iCommunity provides the trust infrastructure layer to build that flow on, with integrated compliance gateways.",
          ],
        },
      ],
    },
    cta: {
      es: {
        text: "¿Quieres tokenizar un flujo de pagos real? Te mostramos cómo funciona sobre la infraestructura de iCommunity con un caso de tu sector.",
        button: "Solicitar demo",
      },
      en: {
        text: "Want to tokenize a real payment flow? We'll show you how it works on iCommunity infrastructure with a case from your industry.",
        button: "Request demo",
      },
    },
  },
  {
    slug: "tokenizacion-inmobiliaria",
    date: "2026-10-04",
    readingMinutes: 7,
    category: { es: "Inmobiliario", en: "Real estate" },
    title: {
      es: "Tokenización inmobiliaria: guía para tokenizar activos en 2026",
      en: "Real estate tokenization: a guide to tokenizing assets in 2026",
    },
    description: {
      es: "Cómo tokenizar un activo inmobiliario: proceso paso a paso, beneficios, marco legal europeo (MiCA) y el papel de la trazabilidad blockchain.",
      en: "How to tokenize a real estate asset: step-by-step process, benefits, the European legal framework (MiCA) and the role of blockchain traceability.",
    },
    intro: {
      es: [
        "El mercado inmobiliario mueve billones de euros al año con una infraestructura de inversión apenas digitalizada: ticket mínimo alto, procesos notariales lentos y liquidez prácticamente nula hasta la venta. La tokenización inmobiliaria ataca exactamente esos tres puntos.",
        "Esta guía explica cómo funciona el proceso, qué permite hacer y qué marco legal lo hace posible en Europa.",
      ],
      en: [
        "The real estate market moves trillions every year on barely digitalized investment infrastructure: high minimum tickets, slow notarial processes and virtually zero liquidity until sale. Real estate tokenization attacks exactly those three pain points.",
        "This guide explains how the process works, what it enables, and which legal framework makes it possible in Europe.",
      ],
    },
    sections: {
      es: [
        {
          heading: "Qué es la tokenización inmobiliaria",
          paragraphs: [
            "Tokenizar un inmueble significa representar su valor —total o parcialmente— como tokens digitales, cada uno equivalente a una participación sobre el activo. El inmueble sigue siendo uno; la propiedad sobre él se divide en miles o millones de unidades negociables.",
            "No se trata de vender casas por internet: es cambiar la unidad de inversión. En lugar de un edificio indivisible, un activo fraccionado, auditable y con mercado secundario potencial.",
          ],
        },
        {
          heading: "El proceso paso a paso",
          paragraphs: [
            "Un proyecto de tokenización bien estructurado sigue cinco fases: constitución de un vehículo que agrupe el activo, auditoría y tasación independientes, definición del modelo de participación y de derechos de los titulares, emisión de los tokens sobre un registro blockchain trazable, y distribución (venta primaria y mercado secundario regulado).",
          ],
          bullets: [
            "Vehículo jurídico que agrupa el activo.",
            "Tasación y auditoría independientes.",
            "Diseño de derechos de los titulares de los tokens.",
            "Emisión sobre registro blockchain con sello de tiempo.",
            "Distribución y mercado secundario.",
          ],
        },
        {
          heading: "Beneficios para promotores e inversores",
          paragraphs: [
            "Para el promotor, la tokenización amplía la base de inversores potenciales y permite financiar proyectos sin depender de un número reducido de grandes aportaciones. Para el inversor, reduce el ticket mínimo de entrada y aporta liquidez: la participación se puede transmitir sin esperar a la venta del activo.",
            "En ambos casos, cada transferencia queda registrada de forma inmutable, lo que reduce el coste de registro, elimina disputas sobre titularidad y da al regulador una pista de auditoría completa.",
          ],
        },
        {
          heading: "Marco legal: MiCA y normativa española",
          paragraphs: [
            "El reglamento MiCA de la UE proporciona el marco europeo para los tokens que representan activos, y en España la normativa de crowdfunding y financiación participativa define cómo pueden distribuirse participaciones al público minorista. El resultado es un terreno de juego definido: la tokenización inmobiliaria ya no opera en un vacío legal.",
            "El requisito práctico más importante es la trazabilidad: poder demostrar en todo momento quién posee qué y cómo se transmitió, con validez ante auditor y regulador. Es exactamente el problema que resuelve la capa de evidencia verificable sobre blockchain.",
          ],
        },
        {
          heading: "Qué mirar antes de lanzar un proyecto",
          paragraphs: [
            "No todos los proyectos de tokenización son iguales. Antes de lanzar, conviene exigir: estructura jurídica validada, registro de titularidad verificable e independiente, cumplimiento MiCA demostrable, y una capa técnica que garantice la integridad de cada transferencia con sello de tiempo.",
          ],
        },
      ],
      en: [
        {
          heading: "What real estate tokenization is",
          paragraphs: [
            "Tokenizing a property means representing its value —fully or partially— as digital tokens, each equivalent to a share in the asset. The property remains one; ownership of it is divided into thousands or millions of tradable units.",
            "It is not about selling houses online: it changes the unit of investment. Instead of an indivisible building, a fractionalized, auditable asset with a potential secondary market.",
          ],
        },
        {
          heading: "The process step by step",
          paragraphs: [
            "A well-structured tokenization project follows five phases: incorporating a vehicle that holds the asset, independent appraisal and audit, defining the participation model and token holders' rights, issuing the tokens on a traceable blockchain registry, and distribution (primary sale and regulated secondary market).",
          ],
          bullets: [
            "Legal vehicle holding the asset.",
            "Independent appraisal and audit.",
            "Design of token holders' rights.",
            "Issuance on a blockchain registry with timestamping.",
            "Distribution and secondary market.",
          ],
        },
        {
          heading: "Benefits for developers and investors",
          paragraphs: [
            "For the developer, tokenization broadens the pool of potential investors and makes it possible to fund projects without relying on a small number of large contributions. For the investor, it lowers the minimum entry ticket and adds liquidity: the share can be transferred without waiting for the asset to be sold.",
            "In both cases, every transfer is immutably recorded, reducing registration costs, eliminating ownership disputes and giving the regulator a complete audit trail.",
          ],
        },
        {
          heading: "Legal framework: MiCA and Spanish regulation",
          paragraphs: [
            "The EU's MiCA regulation provides the European framework for asset-referenced tokens, and in Spain the crowdfunding and participatory finance regulation defines how shares can be distributed to retail investors. The result is a defined playing field: real estate tokenization no longer operates in a legal vacuum.",
            "The most important practical requirement is traceability: being able to prove at all times who owns what and how it was transferred, with validity before auditors and regulators. That is exactly the problem the verifiable-evidence layer on blockchain solves.",
          ],
        },
        {
          heading: "What to check before launching a project",
          paragraphs: [
            "Not all tokenization projects are equal. Before launching, require: a validated legal structure, an independent and verifiable ownership registry, demonstrable MiCA compliance, and a technical layer that guarantees the integrity of every transfer with timestamping.",
          ],
        },
      ],
    },
    cta: {
      es: {
        text: "¿Estás evaluando tokenizar un activo inmobiliario? Te contamos cómo montar la capa de trazabilidad y evidencia verificable del proyecto.",
        button: "Solicitar demo",
      },
      en: {
        text: "Evaluating the tokenization of a real estate asset? We'll show you how to build the project's traceability and verifiable-evidence layer.",
        button: "Request demo",
      },
    },
  },
];

export const getArticle = (slug: string | undefined): Article | undefined =>
  articles.find((a) => a.slug === slug);
