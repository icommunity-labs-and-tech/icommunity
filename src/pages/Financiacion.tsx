import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import ContactModal from "@/components/home/ContactModal";
import { useState } from "react";
import logoPrtrNextgen from "@/assets/logo-prtr-nextgen.webp";

const Financiacion = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[hsl(225,30%,6%)] text-white/80">
      <Navbar onOpenModal={() => setModalOpen(true)} />
      <ContactModal open={modalOpen} onOpenChange={setModalOpen} />

      <main className="ic-container pt-28 pb-20">
        <article className="max-w-3xl mx-auto space-y-16 text-sm leading-relaxed">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Proyectos Cofinanciados</h1>

          {/* Proyecto Blockchain PRTR 2025 */}
          <section className="space-y-4 border border-white/10 rounded-xl p-6 md:p-8 bg-white/[0.02]">
            <h2 className="text-xl font-semibold text-white">Proyecto de Caso de Uso Blockchain – PRTR 2025</h2>
            <p>
              iCommunity Labs, S.L. ha sido beneficiaria de la subvención correspondiente a la convocatoria de ayudas dirigidas al
              desarrollo de casos de uso Blockchain, convocada por la Consejería de Digitalización de la Comunidad de Madrid en el marco del
              Componente 13, Inversión 1 del Plan de Recuperación, Transformación y Resiliencia.
            </p>
            <ul className="list-disc list-inside space-y-1 text-white/70">
              <li>Número de expediente: 03-CUB1-00026.3/2025</li>
              <li>Importe de la subvención concedida: 99.892,37 €</li>
              <li>Convocatoria: Orden 235/2025, de 13 de agosto</li>
              <li>Programa: Redes territoriales de especialización tecnológica</li>
            </ul>
            <p>
              La actuación ha permitido el desarrollo de soluciones avanzadas basadas en tecnología blockchain aplicadas a la certificación y
              trazabilidad digital.
            </p>
            <p className="text-xs text-white/40 pt-2">
              Proyecto financiado por la Unión Europea – NextGenerationEU en el marco del Plan de Recuperación, Transformación y Resiliencia.
            </p>
          </section>

          {/* Proyecto DATIA */}
          <section className="space-y-4 border border-white/10 rounded-xl p-6 md:p-8 bg-white/[0.02]">
            <h2 className="text-xl font-semibold text-white">Proyecto DATIA (Consorcio 2024) – Cofinanciación FEDER 2021–2027</h2>
            <p>
              iCommunity Labs, S.L. participa como entidad beneficiaria en el CONSORCIO 2024 DATIA, en el marco de la convocatoria
              2024 de ayudas para proyectos de innovación tecnológica de efecto tractor en consorcio, cofinanciadas por el Fondo Europeo de
              Desarrollo Regional (FEDER) dentro del Programa Operativo FEDER de la Comunidad de Madrid 2021–2027.
            </p>
            <h3 className="text-base font-semibold text-white">Importes aprobados (según Orden de concesión)</h3>
            <ul className="list-disc list-inside space-y-1 text-white/70">
              <li>Inversión subvencionable (iCommunity): 413.140,93 € (A1: 124.219,84 € · A2: 231.412,18 € · A3: 57.508,91 €)</li>
              <li>Orden+Concesión+Hubs+2024</li>
              <li>Importe máximo de la ayuda concedida (iCommunity): 277.438,72 € (A1: 99.375,87 € · A2: 132.055,72 € · A3: 46.007,13 €)</li>
              <li>Intensidad máxima de ayuda: 80%</li>
            </ul>
            <p>
              Este proyecto contribuye a la mejora de la cooperación público-privada en I+D+i en la Comunidad de Madrid, conforme a la
              Orden de concesión correspondiente.
            </p>
            <p className="text-xs text-white/40 pt-2">
              Proyecto parcialmente financiado por el Fondo Europeo de Desarrollo Regional (FEDER) en el marco del Programa Operativo Comunidad de Madrid 2021–2027.
            </p>
          </section>

          {/* Proyecto Cervera */}
          <section className="space-y-4 border border-white/10 rounded-xl p-6 md:p-8 bg-white/[0.02]">
            <h2 className="text-xl font-semibold text-white">Proyectos de I+D de Transferencia Tecnológica "Cervera"</h2>
            <div className="space-y-1 text-white/60">
              <p>Nº: Proyecto IDI-20200143</p>
              <p>Título: ICOMMUNITY BLOCKCHAIN SOLUTIONS</p>
              <p>Entidad: B-88350897 ICOMMUNITY LABS & TECH SL</p>
              <p>Presupuesto concedido: 298,395.70€</p>
            </div>
            <p>
              El objetivo del proyecto Cervera, es la financiación de proyectos individuales de I+D desarrollados por empresas que colaboren
              con Centros Tecnológicos de ámbito estatal en las tecnologías prioritarias Cervera.
            </p>
            <p>
              Esta financiación ha permitido a iCommunity Labs completar el desarrollo de la plataforma IBS, colaborando junto con el
              <strong className="text-white"> Centro Tecnológico EURECAT</strong> de Barcelona en la investigación de soluciones técnicas encaminadas hacia la resolución de la
              <strong className="text-white"> interoperabilidad</strong> entre las cadenas de bloques/DLTs.
            </p>
          </section>

          {/* Programa NEOTEC */}
          <section className="space-y-4 border border-white/10 rounded-xl p-6 md:p-8 bg-white/[0.02]">
            <h2 className="text-xl font-semibold text-white">Programa NEOTEC</h2>
            <div className="space-y-1 text-white/60">
              <p>Expediente: EXP 00135216 / SNEO-20201073</p>
              <p>Título: TECNOLOGÍA DE SEGURIDAD MEDIANTE ALGORITMOS DE ENCRIPTACIÓN E IDENTIDAD TOKENIZADA PARA EL ALMACENAMIENTO DE DATOS EN REDES IPFS Y BLOCKCHAIN.</p>
              <p>Entidad: B-88350897 ICOMMUNITY LABS & TECH SL</p>
              <p>Presupuesto concedido: 250.000€</p>
            </div>
            <p>
              El objetivo del programa NEOTEC, es la financiación de la puesta en marcha de nuevos proyectos empresariales, que requieran
              el uso de tecnologías o conocimientos desarrollados a partir de la actividad investigadora y en los que la estrategia de negocio se
              base en el desarrollo de tecnología.
            </p>
            <p>
              Esta financiación ha facilitado a iCommunity Labs desarrollar su tecnología de seguridad mediante algoritmos de encriptación e
              identidad tokenizada para el almacenamiento de datos en redes IPFS y blockchain. Esto incluye la creación de un módulo de
              identidad digital unificada basado en algoritmos de prueba conocimiento cero o zero knowledge proof (ZKP) que nos permitirán
              reducir los datos personales que se comparten con terceros y mejorar la privacidad de los mismos gracias a técnicas de
              criptografía avanzadas.
            </p>
          </section>

          {/* Programa Fomento Contratación Jóvenes */}
          <section className="space-y-4 border border-white/10 rounded-xl p-6 md:p-8 bg-white/[0.02]">
            <h2 className="text-xl font-semibold text-white">Programa para el Fomento de la Contratación para Jóvenes en la Comunidad de Madrid</h2>
            <div className="space-y-1 text-white/60">
              <p>No Expediente: 09-GCE1-02346.6/2024</p>
              <p>Beneficiario: iCommunity Labs y Tech SL</p>
              <p>Programa: Fomento de la contratación en el ámbito de la Comunidad de Madrid.</p>
              <p>Línea: Contratación estable de personas jóvenes.</p>
            </div>
            <p>
              ICOMMUNITY LABS & TECH, S.L. ha recibido una ayuda para al contratación estable de jóvenes, del programa para el fomento de
              la contratación en el ámbito de la Comunidad de Madrid.
            </p>
          </section>

        </article>
      </main>

      <Footer onOpenModal={() => setModalOpen(true)} />
    </div>
  );
};

export default Financiacion;
