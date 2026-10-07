# Panel privado del blog

## Qué vais a tener
- Página privada `/admin/blog` con acceso por email y contraseña o cuenta de Google.
- Varias personas: tú eres administrador y das acceso a otros emails del equipo desde el propio panel (invitar / quitar).
- Lista de todas las entradas (las 51 actuales incluidas) con buscador, filtro por tipo y estado (borrador / publicada).
- Editor por entrada: título, descripción, tipo (artículo, caso de éxito, noticia), fecha, imagen de portada, texto con encabezados, párrafos, listas e imágenes intercaladas.
- Subida de imágenes (arrastrar y soltar), guardadas en el almacenamiento de la web.
- Botón "Traducir al inglés con IA": rellena la versión inglesa para que la revises antes de publicar.
- Vista previa antes de publicar; publicar / despublicar / borrar.

## Cómo se ve en la web
- /blog y cada artículo leen las entradas del panel al momento: lo que publicas aparece enseguida para los lectores.
- Mapa del sitio, feeds RSS/Atom y la versión para buscadores se generan en cada publicación de la web. Limitación: un artículo nuevo entra en ellos al pulsar "Publicar" en Lovable (o pidiéndomelo). Google igualmente lo descubre al enlazarse desde /blog.

## Pasos
1. Base de datos: tabla de entradas, tabla de roles (admin / editor), almacén de imágenes público. Lectura pública solo de entradas publicadas; escritura solo para editores.
2. Copiar las 51 entradas actuales a la base de datos (mismas direcciones y fechas). Las redirecciones antiguas no cambian.
3. Inicio de sesión (email + Google), página de acceso y protección del panel.
4. Panel: lista, editor, subida de imágenes, gestión de equipo.
5. Función de traducción con IA.
6. Blog público, sitemap, feeds y prerender leen de la base de datos.
7. Asignarte como primer administrador (tras tu primer acceso, con el email que me indiques).

## Detalles técnicos
- Tablas: `blog_posts` (slug único, kind, date, status, cover_url, title/description/blocks jsonb por idioma, translated), `user_roles` + `has_role()` security definer (enum `admin`, `editor`). RLS: anon SELECT where status='published'; editor/admin CRUD; solo admin gestiona roles. Grants explícitos.
- Bucket `blog-images` público de lectura; subida solo editores.
- Bloque nuevo `{type:"image", url, alt}` en `BlogBlock`.
- Auth centralizado en un hook `useAuth`; Google vía configuración gestionada; email activado.
- Edge function `blog-translate`: auth check → validación → traducción → respuesta. Usa la clave de OpenAI ya guardada (misma decisión que la guía de cumplimiento; no hay clave de Anthropic en el proyecto).
- Datos con React Query. `src/content/blogPosts.ts` queda solo como semilla de la migración.
- `scripts/generate-sitemap.ts` y `scripts/seo-prerender.ts` consultan la tabla con la clave pública en build (fallback al archivo si falla).
- Invitación de editores: edge function con service role que crea/busca el usuario por email y le asigna rol.
