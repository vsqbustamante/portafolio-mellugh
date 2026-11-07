# portafolio-mellugh

Este es el repositorio del Portafolio de la persona que hace más felices mis días <3

Portafolio de **Melissa Villatoro (@mellugh)**, editora y creadora de contenido. Presenta su trayectoria, servicios, proyectos de videografía y fotografía, y permite iniciar una conversación por correo o Instagram.

## El proyecto

Sitio estático construido con **HTML, CSS y JavaScript**, sin frameworks, dependencias de npm ni proceso de compilación. Está preparado para publicarse en Vercel; los videos se alojarán en YouTube como **no listados**.

- Diseño responsive, tema claro y oscuro, y preferencia de tema guardada en el navegador.
- Animaciones de entrada, destellos y efectos que respetan la preferencia de movimiento reducido.
- Carrusel infinito de servicios con tarjeta activa destacada y avance automático cada 10 segundos.
- Videografía por cliente dentro de un marco de teléfono, con puntos y navegación limitados al grupo seleccionado.
- Galería de fotografía con filtros y ampliación.
- Descarga del CV y formulario que prepara un correo.

## Estructura

```text
portafolio-mellugh/
├── index.html           # Contenido, secciones y estructura de la página
├── css/
│   └── styles.css       # Diseño, colores, animaciones y responsive
├── js/
│   └── main.js          # Datos editables e interacciones
├── images/              # Fotografías, portadas, logos e íconos
├── documentos/          # PDF del CV e instrucciones para agregarlo
├── videos/              # Instrucciones y alternativa para videos locales
├── LICENSE
└── README.md
```

## Ver el sitio en local

1. Clona o descarga el repositorio.
2. Abre la carpeta en tu editor.
3. Abre `index.html` en un navegador. También puedes servir la carpeta con una herramienta como Live Server si ya la utilizas.

No necesitas ejecutar `npm install` ni configurar un servidor de backend. Las fuentes de Google y los videos de YouTube requieren conexión a Internet.

## Editar el contenido

Los textos de presentación, la trayectoria y los enlaces están en `index.html`. Los datos que generan contenido dinámico se encuentran al principio de `js/main.js`:

| Configuración | Qué modifica |
| --- | --- |
| `SERVICES` | Tarjetas de servicios y opciones del formulario |
| `VIDEO_GROUPS` | Clientes y videos de cada apartado |
| `PHOTOS` | Fotografías, categorías y descripciones |
| `BRANDS` | Marcas del carrusel «He trabajado con» |
| `TESTI` | Testimonios y etiqueta de borrador |
| `CONTACT_EMAIL` | Destinatario del correo preparado por el formulario |

Conserva las comas, comillas y llaves al modificar los objetos. Para cambiar la apariencia, utiliza las variables de color y tipografía al inicio de `css/styles.css`; los ajustes para tablet y móvil están en sus reglas `@media`.

### Servicios

Cada objeto de `SERVICES` contiene un ícono (`icon`), título (`t`), descripción (`d`) y lista de puntos (`items`). Los íconos disponibles son `video`, `spark`, `camera`, `chart` y `star`.

Al agregar o editar un servicio, se actualizan tanto el carrusel como el selector del formulario. El botón «Cotizar» preselecciona ese servicio.

### Videos de YouTube

1. Sube el video a YouTube con visibilidad **No listado** y permite su inserción en otros sitios.
2. Copia el ID del video, no el enlace completo. Por ejemplo, en `https://youtu.be/ABC123xyz00`, el ID es `ABC123xyz00`.
3. Busca el video correspondiente en `VIDEO_GROUPS` y completa `yt`. Deja `src` vacío.

```js
{
  t: "Campaña de temporada",
  c: "Grupo Lorena",
  src: "",
  yt: "ABC123xyz00",
  poster: "images/lorena-01.jpg"
}
```

El ejemplo es ilustrativo: reemplaza el ID y agrega la imagen indicada, o deja `poster: ""` para usar la portada provisional. `t` es el título del video y `c` la empresa.

Distribución preparada para **14 videos**:

| Grupo | Videos |
| --- | --- |
| Grupo Lorena | 4 |
| RedOpt | 4: Aire Nordico, Clínica Bariátrica, Pulso shop y Óptica Focus Plus |
| Shopping Center | 2 |
| Emprendimientos | 2: Buns y Pikemos |
| Imperial Autos | 1 |
| Mis Huellas UGB | 1 |

Los grupos se ordenan automáticamente de mayor a menor cantidad. En los empates se conserva el orden de la configuración. Para agregar otro cliente, añade un objeto con `name` y su arreglo `videos`.

El carrusel avanza cada **10 segundos dentro del grupo seleccionado**. Se pausa durante la interacción, al reproducir un video o cuando no está visible. Los videos no listados pueden verse y compartirse por cualquiera que tenga el enlace; no son privados.

Si prefieres un MP4 directo, deja `yt` vacío y completa `src` con su URL o ruta. Consulta [las instrucciones de videos](videos/README.md).

### Fotografías y marcas

- La galería utiliza archivos `images/Illustration-N.jpg`. El campo `n` de `PHOTOS` determina el número del archivo; `cat` define el filtro, `c` el cliente y `d` la descripción accesible.
- En `BRANDS`, completa `name` y, opcionalmente, `logo`. Si no tienes un logo, omite esa propiedad para mostrar el nombre en texto.
- Sustituye los textos provisionales de `TESTI` por testimonios reales y elimina `draft: true` cuando estén listos.

Usa rutas relativas con `/` y respeta exactamente las mayúsculas, minúsculas y extensiones de los archivos.

### Descargar CV

Agrega el PDF en esta ruta:

```text
documentos/CV-Melissa-Villatoro.pdf
```

El botón «Descargar CV» ya apunta allí. Si cambias el nombre, actualiza los atributos `href` y `download` en `index.html`. Consulta [las instrucciones del CV](documentos/README.md).

### Contacto

El sitio utiliza **mellugh7@gmail.com** e **Instagram @mellugh**. Si cambian, actualiza `CONTACT_EMAIL` en `js/main.js` y los enlaces y textos de contacto de `index.html`.

El formulario valida los campos y abre la aplicación de correo del visitante con el asunto y el mensaje preparados. **No envía correos directamente**: la persona debe revisar y enviar el mensaje desde esa aplicación. Si no tiene una configurada, puede usar el correo publicado o Instagram. No requiere claves ni un servicio de envío de correo.

## Publicar en Vercel

1. Sube el repositorio a tu proveedor Git y luego impórtalo en Vercel.
2. Selecciona **Other** como framework si no se detecta automáticamente.
3. Utiliza como raíz la carpeta que contiene `index.html`.
4. Deja los comandos de instalación y compilación vacíos; el sitio se sirve tal como está.
5. Si necesitas indicar un directorio de salida, utiliza `.` para servir la raíz del proyecto.
6. Despliega y verifica imágenes, videos, enlaces y descarga del PDF en la URL publicada.

No se necesita una carpeta `dist` ni variables de entorno para la implementación actual. Con el repositorio conectado, los nuevos cambios enviados a la rama de producción generan nuevos despliegues. Consulta la [configuración de compilación de Vercel](https://vercel.com/docs/builds/configure-a-build).

## Antes de publicar

- Agregar los IDs reales de YouTube y comprobar que permiten reproducción insertada.
- Agregar el PDF del CV y probar su descarga.
- Completar las fotografías y logos referenciados: actualmente faltan archivos `Illustration-N.jpg` y varios logos definidos en `BRANDS`.
- Revisar nombres, fechas, cifras y testimonios; todavía hay contenido de ejemplo.
- Probar el sitio en móvil y escritorio, en ambos temas y con navegación por teclado.
- Comprobar los carruseles con cambios rápidos y confirmar que el formulario prepara correctamente el correo.

No hay una suite automatizada de pruebas configurada. La revisión visual y la reproducción real de los videos deben comprobarse en el navegador.

## Licencia

El repositorio incluye una licencia **MIT**. Consulta [LICENSE](LICENSE) para conocer sus términos.
