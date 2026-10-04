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
  {
    slug: "pasaporte-digital-de-producto-dpp",
    date: "2026-10-04",
    readingMinutes: 10,
    category: { es: "Guía regulatoria", en: "Regulatory guide" },
    title: {
      es: "Pasaporte Digital de Producto (DPP): guía completa del reglamento ESPR",
      en: "Digital Product Passport (DPP): a complete guide to the ESPR regulation",
    },
    description: {
      es: "Qué es el Pasaporte Digital de Producto de la UE, qué exige el reglamento ESPR, a qué productos afecta, calendario y cómo implantarlo con evidencia verificable.",
      en: "What the EU Digital Product Passport is, what the ESPR regulation requires, which products it covers, the timeline and how to implement it with verifiable evidence.",
    },
    intro: {
      es: [
        "El Pasaporte Digital de Producto (DPP, por sus siglas en inglés) es un registro electrónico que acompaña a un producto durante todo su ciclo de vida: origen de los materiales, composición, huella ambiental, instrucciones de reparación y opciones de reciclaje. Se consulta a través de un identificador físico en el producto —normalmente un código QR— y deben poder leerlo consumidores, operadores económicos, autoridades y recicladores.",
        "Su base legal es el Reglamento (UE) 2024/1781 de Diseño Ecológico para Productos Sostenibles (ESPR), en vigor desde julio de 2024. El ESPR no impone el DPP a todos los productos de golpe: lo hace categoría a categoría mediante actos delegados. Por eso la pregunta útil para una empresa no es si le afectará, sino cuándo y con qué datos.",
      ],
      en: [
        "The Digital Product Passport (DPP) is an electronic record that travels with a product throughout its life cycle: origin of materials, composition, environmental footprint, repair instructions and recycling options. It is accessed through a physical identifier on the product —usually a QR code— and must be readable by consumers, economic operators, authorities and recyclers.",
        "Its legal basis is Regulation (EU) 2024/1781 on Ecodesign for Sustainable Products (ESPR), in force since July 2024. ESPR does not impose the DPP on every product at once: it does so category by category through delegated acts. So the useful question for a company is not whether it will be affected, but when and with which data.",
      ],
    },
    sections: {
      es: [
        {
          heading: "Qué productos están afectados y cuándo",
          paragraphs: [
            "Las baterías son la primera categoría con fecha cerrada: el Reglamento de Baterías (UE) 2023/1542 exige el pasaporte de batería a partir de febrero de 2027 para baterías industriales de más de 2 kWh, baterías de vehículos eléctricos y de medios de transporte ligeros.",
            "Para el resto, el primer plan de trabajo del ESPR prioriza acero y hierro, aluminio, textil (especialmente prendas de vestir), muebles, neumáticos y colchones, además de requisitos horizontales como reparabilidad y contenido reciclado. Cada acto delegado fija los datos obligatorios y un periodo de adaptación, que en la práctica sitúa la mayoría de obligaciones entre 2027 y 2030.",
          ],
        },
        {
          heading: "Qué información debe contener un DPP",
          paragraphs: [
            "El contenido exacto lo define el acto delegado de cada categoría, pero el reglamento establece un núcleo común:",
          ],
          bullets: [
            "Identificador único del producto, del operador económico y de la instalación de fabricación.",
            "Composición, sustancias de interés y contenido reciclado.",
            "Huella ambiental y de carbono cuando el acto delegado lo exija.",
            "Información de uso, reparación, desmontaje y fin de vida.",
            "Certificados, declaraciones de conformidad y documentación técnica.",
            "Niveles de acceso diferenciados: público, profesionales y autoridades.",
          ],
        },
        {
          heading: "Requisitos técnicos: interoperabilidad, persistencia e integridad",
          paragraphs: [
            "El ESPR exige que los datos del pasaporte sean interoperables, accesibles de forma gratuita, disponibles durante la vida útil prevista del producto y protegidos frente a manipulaciones. La Comisión mantiene además un registro central de identificadores de DPP, y las aduanas podrán verificar su existencia en la importación.",
            "El reto no es generar un QR, sino garantizar que los datos que hay detrás son auténticos, que nadie los ha alterado después de emitirlos y que siguen accesibles aunque el fabricante cambie de proveedor tecnológico o desaparezca.",
          ],
        },
        {
          heading: "Por qué la evidencia verificable es clave",
          paragraphs: [
            "Un pasaporte digital es tan fiable como su peor dato. Si una declaración de contenido reciclado o de origen se puede modificar sin dejar rastro, el DPP se convierte en una herramienta de greenwashing en lugar de transparencia, y el riesgo legal recae sobre el operador económico.",
            "Sellar cada evidencia —certificados, mediciones, eventos de la cadena de suministro— con sello de tiempo e integridad verificable en un registro distribuido permite que cualquier auditor o autoridad compruebe que el dato existía en esa fecha y no ha cambiado, sin depender de la palabra de un único proveedor.",
          ],
        },
        {
          heading: "Cómo prepararse: hoja de ruta en cinco pasos",
          paragraphs: ["Las empresas que se adelantan reducen coste y riesgo. Una secuencia razonable es:"],
          bullets: [
            "Identificar qué productos entran en los primeros actos delegados y sus fechas.",
            "Mapear las fuentes de datos: ERP, PLM, proveedores y certificadores.",
            "Definir el modelo de identificación (GS1 Digital Link u otros estándares abiertos).",
            "Implantar la capa de evidencia verificable para los datos críticos.",
            "Pilotar con una referencia de producto antes de escalar al catálogo.",
          ],
        },
      ],
      en: [
        {
          heading: "Which products are affected and when",
          paragraphs: [
            "Batteries are the first category with a firm date: the Batteries Regulation (EU) 2023/1542 requires the battery passport from February 2027 for industrial batteries above 2 kWh, electric-vehicle batteries and light means of transport batteries.",
            "For everything else, the first ESPR working plan prioritises iron and steel, aluminium, textiles (especially apparel), furniture, tyres and mattresses, plus horizontal requirements such as repairability and recycled content. Each delegated act sets the mandatory data and a transition period, which in practice places most obligations between 2027 and 2030.",
          ],
        },
        {
          heading: "What information a DPP must contain",
          paragraphs: ["The exact content is defined by each category's delegated act, but the regulation sets a common core:"],
          bullets: [
            "Unique identifier of the product, the economic operator and the manufacturing facility.",
            "Composition, substances of concern and recycled content.",
            "Environmental and carbon footprint where the delegated act requires it.",
            "Use, repair, disassembly and end-of-life information.",
            "Certificates, declarations of conformity and technical documentation.",
            "Differentiated access levels: public, professionals and authorities.",
          ],
        },
        {
          heading: "Technical requirements: interoperability, persistence and integrity",
          paragraphs: [
            "ESPR requires passport data to be interoperable, accessible free of charge, available for the expected lifetime of the product and protected against tampering. The Commission also runs a central registry of DPP identifiers, and customs will be able to check that a passport exists at import.",
            "The challenge is not generating a QR code but guaranteeing that the data behind it is authentic, that nobody altered it after issuance and that it remains accessible even if the manufacturer changes technology provider or disappears.",
          ],
        },
        {
          heading: "Why verifiable evidence is key",
          paragraphs: [
            "A digital passport is only as reliable as its weakest data point. If a recycled-content or origin claim can be changed without a trace, the DPP becomes a greenwashing tool instead of a transparency one, and the legal risk falls on the economic operator.",
            "Sealing each piece of evidence —certificates, measurements, supply-chain events— with a timestamp and verifiable integrity on a distributed ledger lets any auditor or authority check that the data existed on that date and has not changed, without relying on a single provider's word.",
          ],
        },
        {
          heading: "How to prepare: a five-step roadmap",
          paragraphs: ["Companies that move early reduce cost and risk. A reasonable sequence is:"],
          bullets: [
            "Identify which products fall under the first delegated acts and their dates.",
            "Map data sources: ERP, PLM, suppliers and certifiers.",
            "Define the identification model (GS1 Digital Link or other open standards).",
            "Implement the verifiable-evidence layer for critical data.",
            "Pilot with one product reference before scaling to the catalogue.",
          ],
        },
      ],
    },
    cta: {
      es: {
        text: "CertyPass es nuestro Pasaporte Digital de Producto basado en evidencia verificable y alineado con el ESPR. Te ayudamos a pilotarlo con una referencia de tu catálogo.",
        button: "Solicitar demo",
      },
      en: {
        text: "CertyPass is our Digital Product Passport built on verifiable evidence and aligned with ESPR. We can help you pilot it with one reference from your catalogue.",
        button: "Request demo",
      },
    },
  },
  {
    slug: "desafios-implementacion-dpp",
    date: "2026-10-04",
    readingMinutes: 7,
    category: { es: "Guía regulatoria", en: "Regulatory guide" },
    title: {
      es: "Implantar el Pasaporte Digital de Producto: costes, datos y retos técnicos",
      en: "Implementing the Digital Product Passport: costs, data and technical challenges",
    },
    description: {
      es: "Los principales retos al implantar el DPP: calidad de datos de proveedores, interoperabilidad, persistencia a largo plazo, costes y control de acceso.",
      en: "The main challenges of implementing the DPP: supplier data quality, interoperability, long-term persistence, costs and access control.",
    },
    intro: {
      es: [
        "Cumplir con el Pasaporte Digital de Producto no es un proyecto de etiquetado: es un proyecto de datos que atraviesa la cadena de suministro. La mayoría de las dificultades no están en la tecnología del QR, sino en conseguir datos fiables de terceros y mantenerlos verificables durante años.",
      ],
      en: [
        "Complying with the Digital Product Passport is not a labelling project: it is a data project that runs across the supply chain. Most difficulties are not in the QR technology but in obtaining reliable data from third parties and keeping it verifiable for years.",
      ],
    },
    sections: {
      es: [
        {
          heading: "1. Datos de proveedores",
          paragraphs: [
            "Composición, origen de materiales y huella dependen de proveedores de varios niveles que a menudo no comparten formatos ni sistemas. El primer cuello de botella es contractual y operativo: acordar qué datos se entregan, en qué formato y con qué prueba de autenticidad.",
          ],
        },
        {
          heading: "2. Interoperabilidad",
          paragraphs: [
            "El ESPR exige estándares abiertos e interoperables. Una solución cerrada que solo funciona con el software de un proveedor es un riesgo: si cambias de proveedor, el pasaporte debe seguir siendo legible y verificable. Conviene apostar por identificadores estándar y datos exportables.",
          ],
        },
        {
          heading: "3. Persistencia e integridad a largo plazo",
          paragraphs: [
            "Un producto puede estar en uso diez o veinte años. El pasaporte debe seguir accesible y su contenido debe demostrar que no ha sido alterado. Anclar las evidencias en un registro distribuido con sello de tiempo resuelve la parte de integridad sin depender de que un único servidor siga en pie.",
          ],
        },
        {
          heading: "4. Costes",
          paragraphs: [
            "El coste real está en la integración con ERP y PLM y en la recogida de datos, no en la emisión del identificador. Un piloto con pocas referencias permite estimar el coste por producto antes de escalar y priorizar las categorías con obligación más cercana.",
          ],
        },
        {
          heading: "5. Control de acceso y confidencialidad",
          paragraphs: [
            "No toda la información es pública: parte está reservada a recicladores, autoridades o socios. El diseño debe separar niveles de acceso y evitar exponer secretos comerciales, demostrando a la vez la integridad de los datos restringidos.",
          ],
        },
      ],
      en: [
        {
          heading: "1. Supplier data",
          paragraphs: [
            "Composition, material origin and footprint depend on multi-tier suppliers that often share neither formats nor systems. The first bottleneck is contractual and operational: agreeing what data is delivered, in what format and with what proof of authenticity.",
          ],
        },
        {
          heading: "2. Interoperability",
          paragraphs: [
            "ESPR requires open, interoperable standards. A closed solution that only works with one vendor's software is a risk: if you change provider, the passport must remain readable and verifiable. Standard identifiers and exportable data are the safe choice.",
          ],
        },
        {
          heading: "3. Long-term persistence and integrity",
          paragraphs: [
            "A product may be in use for ten or twenty years. The passport must stay accessible and its content must prove it has not been altered. Anchoring evidence on a distributed ledger with a timestamp solves the integrity part without depending on a single server staying up.",
          ],
        },
        {
          heading: "4. Costs",
          paragraphs: [
            "The real cost lies in ERP and PLM integration and data collection, not in issuing the identifier. A pilot with a few references lets you estimate cost per product before scaling and prioritise the categories with the nearest obligation.",
          ],
        },
        {
          heading: "5. Access control and confidentiality",
          paragraphs: [
            "Not all information is public: some is reserved for recyclers, authorities or partners. The design must separate access levels and avoid exposing trade secrets, while still proving the integrity of restricted data.",
          ],
        },
      ],
    },
    cta: {
      es: {
        text: "¿Quieres dimensionar el coste y el esfuerzo del DPP en tu catálogo? Te proponemos un piloto con CertyPass sobre una referencia real.",
        button: "Solicitar demo",
      },
      en: {
        text: "Want to size the cost and effort of the DPP across your catalogue? We propose a CertyPass pilot on one real product reference.",
        button: "Request demo",
      },
    },
  },
  {
    slug: "impacto-ambiental-dpp",
    date: "2026-10-04",
    readingMinutes: 6,
    category: { es: "Sostenibilidad", en: "Sustainability" },
    title: {
      es: "Impacto ambiental del Pasaporte Digital de Producto: reciclaje, reparación y economía circular",
      en: "Environmental impact of the Digital Product Passport: recycling, repair and circular economy",
    },
    description: {
      es: "Cómo el DPP reduce residuos y mejora el reciclaje y la reparación, y por qué las declaraciones ambientales necesitan evidencia verificable para no ser greenwashing.",
      en: "How the DPP reduces waste and improves recycling and repair, and why environmental claims need verifiable evidence to avoid greenwashing.",
    },
    intro: {
      es: [
        "El objetivo de fondo del Pasaporte Digital de Producto es ambiental: que los productos duren más, se reparen y se reciclen mejor. Para eso, cada actor del ciclo de vida necesita información fiable sobre qué contiene el producto y cómo tratarlo.",
      ],
      en: [
        "The underlying goal of the Digital Product Passport is environmental: products that last longer, get repaired and are recycled better. For that, every life-cycle actor needs reliable information about what the product contains and how to handle it.",
      ],
    },
    sections: {
      es: [
        {
          heading: "Reciclaje más eficiente",
          paragraphs: [
            "Los recicladores necesitan saber qué materiales y sustancias contiene un producto para separarlos correctamente. Con un DPP pueden consultarlo al escanear el identificador, en lugar de deducirlo, lo que mejora la calidad de las materias primas secundarias.",
          ],
        },
        {
          heading: "Reparación y alargamiento de la vida útil",
          paragraphs: [
            "Instrucciones de desmontaje, referencias de recambios e historial de reparaciones facilitan el mercado de reparación y segunda mano, y encajan con las obligaciones europeas sobre derecho a reparar.",
          ],
        },
        {
          heading: "Destrucción de stock no vendido",
          paragraphs: [
            "El ESPR prohíbe a las grandes empresas destruir prendas de vestir y calzado no vendidos y obliga a informar sobre el stock descartado. La trazabilidad del producto ayuda a demostrar qué ha ocurrido con cada lote.",
          ],
        },
        {
          heading: "Declaraciones ambientales verificables",
          paragraphs: [
            "La normativa europea endurece el control de las alegaciones ambientales genéricas. Un dato de huella o de contenido reciclado solo tiene valor si se puede demostrar su origen y que no se ha modificado. La evidencia sellada en un registro distribuido convierte la declaración en algo auditable.",
          ],
        },
      ],
      en: [
        {
          heading: "More efficient recycling",
          paragraphs: [
            "Recyclers need to know which materials and substances a product contains to separate them correctly. With a DPP they can look it up by scanning the identifier instead of guessing, which improves the quality of secondary raw materials.",
          ],
        },
        {
          heading: "Repair and longer product life",
          paragraphs: [
            "Disassembly instructions, spare-part references and repair history support the repair and second-hand market, and fit with EU right-to-repair obligations.",
          ],
        },
        {
          heading: "Destruction of unsold goods",
          paragraphs: [
            "ESPR bans large companies from destroying unsold apparel and footwear and requires disclosure of discarded stock. Product traceability helps prove what happened to each batch.",
          ],
        },
        {
          heading: "Verifiable environmental claims",
          paragraphs: [
            "EU rules are tightening control over generic environmental claims. A footprint or recycled-content figure is only worth something if its origin can be proven and it has not been modified. Evidence sealed on a distributed ledger turns the claim into something auditable.",
          ],
        },
      ],
    },
    cta: {
      es: {
        text: "Con CertyPass tus datos ambientales quedan respaldados por evidencia verificable que cualquier auditor puede comprobar.",
        button: "Solicitar demo",
      },
      en: {
        text: "With CertyPass your environmental data is backed by verifiable evidence any auditor can check.",
        button: "Request demo",
      },
    },
  },
  {
    slug: "verifactu-blockchain",
    date: "2026-10-04",
    readingMinutes: 7,
    category: { es: "Guía regulatoria", en: "Regulatory guide" },
    title: {
      es: "Verifactu y blockchain: integridad de registros de facturación ante la AEAT",
      en: "Verifactu and blockchain: invoicing record integrity for the Spanish Tax Agency",
    },
    description: {
      es: "Qué exige Verifactu, calendario 2027, cómo funciona el encadenamiento de registros y qué aporta una capa de evidencia verificable a cualquier software de facturación.",
      en: "What Verifactu requires, the 2027 timeline, how record chaining works and what a verifiable-evidence layer adds to any invoicing software.",
    },
    intro: {
      es: [
        "Verifactu es el sistema de la Agencia Tributaria derivado de la Ley Antifraude (Ley 11/2021) y del Real Decreto 1007/2023, que obliga a que el software de facturación garantice la integridad, conservación, trazabilidad e inalterabilidad de los registros de facturación.",
        "Tras el aplazamiento aprobado por el Real Decreto-ley 15/2025, la obligación se aplica desde el 1 de enero de 2027 a los contribuyentes del Impuesto sobre Sociedades y desde el 1 de julio de 2027 al resto, incluidos los autónomos. Los fabricantes de software ya están obligados a ofrecer sistemas conformes.",
      ],
      en: [
        "Verifactu is the Spanish Tax Agency (AEAT) system that stems from the Anti-Fraud Law (Law 11/2021) and Royal Decree 1007/2023, requiring invoicing software to guarantee the integrity, preservation, traceability and inalterability of invoicing records.",
        "After the postponement approved by Royal Decree-law 15/2025, the obligation applies from 1 January 2027 to corporate income taxpayers and from 1 July 2027 to everyone else, including the self-employed. Software vendors are already required to offer compliant systems.",
      ],
    },
    sections: {
      es: [
        {
          heading: "Qué exige Verifactu",
          paragraphs: ["Cada factura genera un registro de facturación que debe cumplir varios requisitos:"],
          bullets: [
            "Huella o hash de cada registro, encadenada con el registro anterior.",
            "Inalterabilidad: las correcciones se hacen con nuevos registros, no sobrescribiendo.",
            "Código QR en la factura para que el cliente pueda cotejarla con la AEAT.",
            "Registro de eventos del sistema y conservación de los registros.",
            "Modalidad Verifactu (envío a la AEAT) o no Verifactu (con firma electrónica y requisitos adicionales).",
          ],
        },
        {
          heading: "El encadenamiento: la misma lógica que blockchain",
          paragraphs: [
            "El encadenamiento de hashes que pide Verifactu es el principio sobre el que se construye blockchain: cada registro incorpora la huella del anterior, de modo que alterar uno rompe toda la cadena posterior. La diferencia es quién guarda la cadena y quién puede verificarla.",
          ],
        },
        {
          heading: "Qué aporta una capa de evidencia verificable",
          paragraphs: [
            "Blockchain no sustituye la conformidad con la especificación técnica de la AEAT; la complementa. Anclar periódicamente las huellas de los registros en un registro distribuido con sello de tiempo aporta una prueba independiente, fechada y verificable por terceros de que la cadena de facturación no se ha reescrito.",
            "Es especialmente útil para fabricantes de software que quieren reforzar su declaración responsable, para empresas en modalidad no Verifactu que conservan los registros en sus propios sistemas, y en auditorías o litigios donde hay que demostrar el estado de los registros en una fecha concreta.",
          ],
        },
        {
          heading: "Cómo integrarlo sin cambiar de software",
          paragraphs: [
            "La integración se hace vía API: el software de facturación envía la huella de cada registro o lote, y la capa de evidencia devuelve una prueba verificable. No se exponen datos fiscales en la red, solo huellas criptográficas.",
          ],
        },
      ],
      en: [
        {
          heading: "What Verifactu requires",
          paragraphs: ["Each invoice generates an invoicing record that must meet several requirements:"],
          bullets: [
            "A fingerprint (hash) of each record, chained to the previous record.",
            "Inalterability: corrections are made with new records, never by overwriting.",
            "A QR code on the invoice so the customer can check it with the AEAT.",
            "A system event log and record retention.",
            "Verifactu mode (submission to the AEAT) or non-Verifactu mode (with electronic signature and additional requirements).",
          ],
        },
        {
          heading: "Chaining: the same logic as blockchain",
          paragraphs: [
            "The hash chaining Verifactu requires is the principle blockchain is built on: each record includes the fingerprint of the previous one, so altering one breaks the whole chain after it. The difference is who stores the chain and who can verify it.",
          ],
        },
        {
          heading: "What a verifiable-evidence layer adds",
          paragraphs: [
            "Blockchain does not replace compliance with the AEAT technical specification; it complements it. Periodically anchoring record fingerprints on a distributed ledger with a timestamp provides independent, dated proof, verifiable by third parties, that the invoicing chain has not been rewritten.",
            "It is especially useful for software vendors wanting to strengthen their responsible declaration, for companies in non-Verifactu mode that keep records in their own systems, and in audits or disputes where the state of the records on a given date must be proven.",
          ],
        },
        {
          heading: "How to integrate it without changing software",
          paragraphs: [
            "Integration is done via API: the invoicing software sends the fingerprint of each record or batch, and the evidence layer returns a verifiable proof. No tax data is exposed on the network, only cryptographic fingerprints.",
          ],
        },
      ],
    },
    cta: {
      es: {
        text: "¿Desarrollas o usas software de facturación? Te mostramos cómo añadir evidencia verificable a tus registros Verifactu con una integración API.",
        button: "Solicitar demo",
      },
      en: {
        text: "Do you build or use invoicing software? We'll show you how to add verifiable evidence to your Verifactu records with an API integration.",
        button: "Request demo",
      },
    },
  },
];

export const getArticle = (slug: string | undefined): Article | undefined =>
  articles.find((a) => a.slug === slug);
