import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import ContactModal from "@/components/home/ContactModal";
import PageSEO from "@/components/PageSEO";
import { useState } from "react";

const Legal = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[hsl(225,30%,6%)] text-white/80">
      <PageSEO
        title="Legal Notice"
        description="Privacy policy, legal notice and cookie policy of iCommunity Labs & Tech S.L."
        path="/legal"
        lang="es"
      />
      <Navbar onOpenModal={() => setModalOpen(true)} />
      <ContactModal open={modalOpen} onOpenChange={setModalOpen} />

      <main className="ic-container pt-28 pb-20">
        <article className="max-w-3xl mx-auto space-y-12 text-sm leading-relaxed">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white">Política de Privacidad</h1>

          {/* Aviso Legal */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-2">Aviso Legal</h2>
            <p>
              iCommunity Labs &amp; Tech S.L. (en adelante "iCommunity") es la titular del dominio, con domicilio social en Madrid, en la calle Colmenares, 3 – Bajo Dcha, con C.I.F. B88350897 e inscrita en el Registro Mercantil de Madrid al tomo 39.161, Folio 40, Sección 8, Hoja M-695696. Correo electrónico de contacto: <a href="mailto:hello@icommunity.io" className="text-blue-400 hover:underline">hello@icommunity.io</a>.
            </p>
            <p>
              El acceso y/o uso de este sitio web de ICommunity implica la aceptación expresa y sin reservas de las presentes condiciones que rogamos lea detenidamente. Si no estuviera de acuerdo con las condiciones de uso no acceda ni utilice este sitio web.
            </p>
            <p>
              Para mejorar y optimizar la experiencia del usuario, el sitio web de ICommunity utiliza "cookies". Encontrará información detallada sobre qué son las «Cookies», cómo puede desactivarlas en su navegador y cómo bloquear específicamente la instalación de cookies de terceros, en el siguiente enlace.
            </p>
            <p>
              ICommunity se reserva la facultad de llevar a cabo en cualquier momento y sin necesidad de preaviso, cualquier modificación de cuantos elementos integren el diseño, contenido y configuración de la web, ampliar o reducir servicios, o modificar las presentes condiciones generales. El acceso del usuario tras cualquier modificación supone la aceptación de los cambios que se realicen.
            </p>
            <p>
              ICommunity es titular, o cuenta con las licencias correspondientes en su caso, sobre los derechos de explotación de propiedad intelectual e industrial del sitio web, incluyendo todos los contenidos ofrecidos en el mismo (a título enunciativo: imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, selección de materiales usados, acceso y uso, etc.). El acceso y/o utilización del sitio web por parte del usuario no implicará en ningún caso la renuncia, transmisión, licencia o cesión total o parcial de los anteriores derechos por parte de ICommunity. Las referencias a marcas o nombres comerciales u otros signos distintivos, ya sean de ICommunity o de terceros, llevan implícita la prohibición de su uso sin el consentimiento de su legítimo titular.
            </p>
            <p>
              Quedan reservados todos los derechos de propiedad intelectual e industrial sobre los contenidos del sitio web y en particular quedan expresamente prohibidas la reproducción, la distribución y la comunicación pública, incluida su modalidad de puesta a disposición, de la totalidad o parte de los contenidos de esta página web, con fines comerciales, en cualquier soporte y por cualquier medio técnico, sin la autorización previa y por escrito de Icommunity. El Usuario se compromete a respetar los derechos de Propiedad Intelectual e Industrial titularidad de Icommunity. Podrás visualizar los elementos del portal e imprimirlos, copiarlos y almacenarlos en el disco duro de tu ordenador o en cualquier otro soporte físico siempre y cuando sea, única y exclusivamente, para tu uso personal y privado. El Usuario deberá abstenerse de suprimir, alterar o manipular indicaciones de copyright u otros elementos que sirvan para identificar a los titulares de derechos, así como cualquier dispositivo de protección o sistema de seguridad que estuviera instalado en las páginas de Icommunity.
            </p>
            <p>
              El usuario accede a la página web bajo su exclusiva responsabilidad, que se extiende al registro que fuese necesario para acceder a determinados servicios o contenidos. En caso de que el usuario envíe cualquier tipo de información a Icommunity, declara y garantiza que la envía libremente y que dicha información no infringe derechos de propiedad intelectual, industrial, secreto comercial o cualesquiera otros y que no tiene carácter confidencial ni es perjudicial para terceros. En dicho registro el Usuario será responsable de aportar información veraz y lícita. El Usuario se compromete asimismo a hacer un uso adecuado de los contenidos y servicios que Icommunity ofrece o pudiera ofrecer a través de su portal y con carácter enunciativo pero no limitativo, a no emplearlos para incurrir en actividades ilícitas, ilegales o contrarias a la buena fe y al orden público; difundir contenidos o propaganda de carácter racista, xenófobo, pornográfico-ilegal, de apología del terrorismo o que atente contra los derechos humanos; provocar daños en los sistemas físicos y lógicos de Icommunity, de sus proveedores o de terceras personas, introducir o difundir en la red virus informáticos o cualesquiera otros sistemas físicos o lógicos que sean susceptibles de provocar los daños anteriormente mencionados; intentar acceder y, en su caso, utilizar las cuentas de correo electrónico de otros usuarios y modificar o manipular sus mensajes. Icommunity se reserva el derecho de retirar todos aquellos comentarios y aportaciones que pudieran vulnerar el respeto a la dignidad de la persona, que sean discriminatorios, xenófobos, racistas, que atenten contra el orden o la seguridad pública o que, a su juicio, no resultaran adecuados para su publicación. En cualquier caso, Icommunity no será responsable de las opiniones vertidas por los usuarios a través de los foros, chats, u otras herramientas de participación.
            </p>
            <p>
              La inclusión, en su caso, de enlaces para acceder a plataformas y redes sociales pertenecientes a terceros tienen como finalidad posibilitar el acceso al usuario a los diferentes canales que Icommunity pudiera mantener en los mismos, sin que el establecimiento de estas aplicaciones implique la existencia de relación alguna entre Icommunity y el titular, fabricante o distribuidor de la plataforma en cuestión ni la aceptación y/o aprobación por parte de Icommunity de sus contenidos o servicios. Icommunity no asume ninguna responsabilidad sobre la configuración de dichas plataformas o redes sociales ni sobre los contenidos o servicios a los que el usuario pueda acceder a través de los mismos. La información que el usuario proporcione a estas plataformas será bajo su responsabilidad, sin que Icommunity intervenga en dicho proceso. Asimismo, Icommunity se reserva el derecho a no seguir a los usuarios que comiencen a seguir su perfil social.
            </p>
            <p>
              Teniendo en cuenta la imposibilidad de control sobre los contenidos, la información o los servicios ofrecidos por otros sitios web a los que se pueda acceder por enlaces que sean puestos a disposición en nuestra página web, Icommunity queda eximida de cualquier responsabilidad por los daños y perjuicios de cualquier clase que pudieran derivar de la utilización por parte del usuario de páginas webs ajenas o de los contenidos de las mismas.
            </p>
            <p>
              Los hiperenlaces en sitios webs ajenos que permitan al acceso a la página web de Icommunity, no implicarán en ningún caso la existencia de relaciones comerciales o mercantiles con el titular del sitio web donde se establezca el hiperenlace, ni la aceptación por parte de Icommunity de cualesquiera contenidos o servicios. Icommunity no autoriza el establecimiento de un enlace al sitio web desde páginas que contengan contenidos ilícitos, degradantes, obscenos y/o que contravengan las leyes, el orden público o las normas sociales generalmente aceptadas. El usuario que quiera introducir enlaces al portal de Icommunity desde otros sitios web estará obligado a que dicho enlace vincule con la página, no pudiendo reproducirla de ninguna forma. Tampoco podrán establecerse marcos o frames que rodeen el portal o que hagan que su visualización se realice a través de direcciones de internet distintas o conjuntamente con contenidos ajenos al sitio web.
            </p>
            <p>
              Si el usuario tuviera conocimiento de la existencia de algún contenido ilícito, ilegal, contrario a las leyes o que pudiera suponer una infracción de derechos de propiedad intelectual y/o industrial, rogamos lo notifique a Icommunity a través de la dirección de correo electrónico <a href="mailto:hello@icommunity.io" className="text-blue-400 hover:underline">hello@icommunity.io</a>.
            </p>
            <p>
              En caso de que cualquiera de las disposiciones de las presentes condiciones de uso fuese declarada nula total o parcialmente, dicha nulidad no afectará al resto de cláusulas de las presentes condiciones.
            </p>
            <p>
              El presente aviso legal se rige por la Ley Española. Para cualquier controversia que pudiera suscitarse sobre interpretación y cumplimiento de lo expuesto en el mismo, nos sometemos a la jurisdicción de los Juzgados y Tribunales de Madrid.
            </p>
          </section>

          {/* Política de Privacidad */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-2">Política de Privacidad y Protección de datos</h2>
            <p>
              El responsable del tratamiento de datos es Icommunity Labs &amp; Tech S.L. (en adelante "Icommunity") con domicilio social en Madrid, en la calle Colmenares, 3 – Bajo Dcha, con C.I.F. B88350897 y correo electrónico de contacto: <a href="mailto:hello@icommunity.io" className="text-blue-400 hover:underline">hello@icommunity.io</a>.
            </p>
            <p>
              De conformidad con lo establecido en la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los Derechos Digitales así como en el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo de 27 de abril de 2016 (GDPR) y en el resto de legislación vigente en materia de protección de datos de carácter personal, los datos que voluntariamente facilite el usuario serán tratados por Icommunity.
            </p>
            <p>
              El tratamiento de los datos tiene como finalidad dar curso a su solicitud con la finalidad de prestarle la información que solicite. En caso de no rellenar las preguntas marcadas con un asterisco, Icommunity no podrá aceptar y gestionar las consultas que formule. Los datos también podrán ser utilizados para remitir boletines electrónicos de noticias o información de iCommunity que pudieran ser de su interés.
            </p>
            <p>
              El usuario manifiesta que los datos que facilita son verdaderos, completos y actualizados, siendo responsable de cualquier daño o perjuicio, directo o indirecto, que pudiera ocasionar su incumplimiento. En caso de que el usuario facilitara datos de terceros, manifiesta contar con su consentimiento y se compromete a informarle de lo contenido en este aviso legal.
            </p>
            <p>
              Los datos personales facilitados por los usuarios serán conservados durante el plazo adecuado para la realización de las actividades para las que fueron recogidos. Posteriormente, se mantendrán como máximo durante los plazos legalmente establecidos.
            </p>
            <p>
              El usuario podrá ejercer los tradicionales derechos de acceso, rectificación, cancelación y oposición ("derechos ARCO") mediante solicitud escrita y firmada en la que indique su nombre y apellidos y los derechos que desea ejercer, y que deberá enviar junto con una copia de su documento de identidad o pasaporte por correo electrónico a <a href="mailto:hello@icommunity.io" className="text-blue-400 hover:underline">hello@icommunity.io</a> o por correo postal, o medio análogo de envío a Icommunity Labs &amp; Tech S.L. (en adelante "Icommunity") con domicilio social en Madrid, en la calle Colmenares, 3 – Bajo Dcha. C.P. 28014. El usuario podrá solicitar la eliminación de sus datos personales (derecho al olvido) en los supuestos establecidos legalmente, adoptando medidas razonables para la eliminación de enlaces a dichos datos personales, o cualquier copia o réplica de los mismos. Dispondrá asimismo el usuario del derecho a la limitación del tratamiento de sus datos de carácter personal y a solicitar la portabilidad de sus datos.
            </p>
          </section>

          {/* Política de Cookies */}
          <section id="cookies" className="space-y-4">
            <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-2">Política de Cookies</h2>
            <p>
              La presente política de cookies tiene por finalidad informarle de manera clara y precisa sobre las cookies que se utilizan en el website de iCommunity Labs &amp; Techs S.L.
            </p>

            <h3 className="text-base font-semibold text-white/90 pt-2">¿Qué son las cookies?</h3>
            <p>
              Una cookie es un pequeño fragmento de texto que los sitios web que visita envían al navegador y que permite que el sitio web recuerde información sobre su visita, como su idioma preferido y otras opciones, con el fin de facilitar su próxima visita y hacer que el sitio le resulte más útil. Las cookies desempeñan un papel muy importante y contribuyen a tener una mejor experiencia de navegación para el usuario.
            </p>

            <h3 className="text-base font-semibold text-white/90 pt-2">Tipos de cookies</h3>
            <p>
              Según quién sea la entidad que gestione el dominio desde dónde se envían las cookies y se traten los datos que se obtengan, se pueden distinguir dos tipos: cookies propias y cookies de terceros.
            </p>
            <p>
              Existe también una segunda clasificación según el plazo de tiempo que permanecen almacenadas en el navegador del cliente, pudiendo tratarse de cookies de sesión o cookies persistentes.
            </p>
            <p>
              Por último, existe otra clasificación con cinco tipos de cookies según la finalidad para la que se traten los datos obtenidos: cookies técnicas, cookies de personalización, cookies de análisis, cookies publicitarias y cookies de publicidad comportamental.
            </p>
            <p>
              Para más información a este respecto puede consultar la Guía sobre el uso de las cookies de la Agencia Española de Protección de Datos.
            </p>

            <h3 className="text-base font-semibold text-white/90 pt-2">Cookies utilizadas en el website</h3>
            <p>
              A continuación se identifican las cookies que están siendo utilizadas en este portal así como su tipología y función:
            </p>
            <p>
              <strong className="text-white/90">Cookies técnicas:</strong> Son aquéllas que permiten al usuario la navegación a través de una página web, plataforma o aplicación y la utilización de las diferentes opciones o servicios que en ella existan como, por ejemplo, controlar el tráfico y la comunicación de datos, identificar la sesión, acceder a partes de acceso restringido, recordar los elementos que integran un pedido, realizar el proceso de compra de un pedido, realizar la solicitud de inscripción o participación en un evento, utilizar elementos de seguridad durante la navegación, almacenar contenidos para la difusión de videos o sonido o compartir contenidos a través de redes sociales.
            </p>
            <p>
              <strong className="text-white/90">Cookies de personalización:</strong> Son aquéllas que permiten al usuario acceder al servicio con algunas características de carácter general predefinidas en función de una serie de criterios en el terminal del usuario como por ejemplo serian el idioma, el tipo de navegador a través del cual accede al servicio, la configuración regional desde donde accede al servicio, etc.
            </p>

            <h3 className="text-base font-semibold text-white/90 pt-2">Aceptación de la política de cookies</h3>
            <p>
              Pulsando el botón Entendido se asume que usted acepta el uso de cookies.
            </p>

            <h3 className="text-base font-semibold text-white/90 pt-2">Cómo modificar la configuración de las cookies</h3>
            <p>
              Usted puede restringir, bloquear o borrar las cookies del website de iCommunity Labs &amp; Techs S.L. o cualquier otra página web utilizando su navegador. En cada navegador la operativa es diferente, la función de «Ayuda» le mostrará cómo hacerlo.
            </p>

            <h3 className="text-base font-semibold text-white/90 pt-2">Actualizaciones y cambios en la política de cookies</h3>
            <p>
              iCommunity Labs &amp; Techs S.L. se reserva el derecho de modificar esta Política de Cookies en función de exigencias legislativas, reglamentarias, o con la finalidad de adaptar dicha política a las instrucciones dictadas por la Agencia Española de Protección de Datos, por ello se aconseja a los usuarios que la visiten periódicamente.
            </p>
            <p>
              Cuando se produzcan cambios significativos en esta Política de Cookies, estos se comunicarán a los usuarios bien mediante la web o a través de correo electrónico a los usuarios registrados.
            </p>
            <p className="text-white/40 pt-4">28 de junio de 2021</p>
          </section>

          <div className="border-t border-white/10 pt-6 text-center text-xs text-white/30">
            © iCommunity Labs &amp; Tech S.L. Todos los derechos reservados.
          </div>
        </article>
      </main>

      <Footer onOpenModal={() => setModalOpen(true)} />
    </div>
  );
};

export default Legal;
