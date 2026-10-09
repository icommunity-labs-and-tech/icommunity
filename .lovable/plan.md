# Generador de artículos con IA y planificador del blog

Se reaprovecha la lógica del panel de MusicDibs (ideas en bloque, generación completa, búsqueda de tendencias, publicación programada), adaptada al panel actual de iCommunity: mismas tablas y editor, contenido por bloques y ES/EN en una sola entrada.

## Qué vais a tener en /admin/blog

**1. Planificador de publicaciones**
- Nuevo estado "Programada": eliges día y hora y la entrada se publica sola (revisión cada 15 min).
- Filtro "Programadas" en la lista y una vista de calendario simple por semanas con lo que sale cada día.
- Programar / reprogramar / pasar a borrador desde el editor y desde la lista.

**2. Generador en bloque**
- Configuras publicaciones por semana (1, 2, 3 o 5), meses a planificar (1, 2, 3 o 6), día de la semana preferido y temas a cubrir (por defecto: CertyPass, CertyFile, Privaro, MusicDibs, cumplimiento, DPP, eIDAS, sellado de tiempo, trazabilidad).
- La IA propone una tabla de ideas (título, tipo, tema, fecha sugerida). Puedes editar, borrar o mover fechas antes de seguir.
- "Generar todo": escribe cada artículo en español, crea su portada, lo traduce al inglés y lo deja como **Programado** en su fecha (o como borrador, si lo prefieres con un interruptor). Barra de progreso y lista de avisos si alguno falla; los que salen bien se guardan igualmente.

**3. Ideas a partir de tendencias**
- Botón "Buscar tendencias": búsqueda real en internet de noticias de los últimos 30 días sobre vuestro sector.
- Solo medios y foros independientes: se excluyen notas de prensa, blogs corporativos, contenido patrocinado, icommunity.io y sus subdominios, y webs de vuestros productos. Se comprueba cada enlace y se descartan los rotos.
- Cada resultado muestra medio, fecha, resumen y una propuesta de artículo para iCommunity (ángulo y título).
- Desde cada propuesta: "Crear artículo" (abre el editor ya redactado y con la fuente citada) o "Añadir al plan" (entra en la tabla del generador en bloque).

## Detalles técnicos
- IA: se usa la clave de OpenAI ya guardada (en este proyecto no hay clave de Gemini). Texto con `gpt-4.1-mini` y salida JSON estricta; búsqueda con la herramienta `web_search` de la API Responses de OpenAI; portadas con `gpt-image-1` (como ahora).
- Se amplía la función existente `blog-ai` (no se crea una nueva) con acciones `ideas`, `trends` y `article` con fuente opcional. Mismo control de acceso (admin/editor). Verificación de URLs y filtro de dominios propios/corporativos en servidor, como en MusicDibs.
- Base de datos: sin tablas nuevas. `blog_posts` añade `publish_at timestamptz` y el estado `scheduled`. Función `publish_due_blog_posts()` (security definer) + tarea programada cada 15 min que pasa a `published` lo vencido y fija `date`. La lectura pública sigue mostrando solo `published`.
- La generación en bloque se ejecuta desde el navegador artículo a artículo (como en MusicDibs) para evitar tiempos límite; reutiliza `blog-translate` y la subida de portadas al almacenamiento privado.
- Limitación ya conocida: mapa del sitio, feeds y versión para buscadores se actualizan al publicar la web; las entradas programadas aparecen al momento en /blog, pero entran en el sitemap en la siguiente publicación.
- Coste: cada artículo, portada y búsqueda se cobra en vuestra cuenta de OpenAI.
