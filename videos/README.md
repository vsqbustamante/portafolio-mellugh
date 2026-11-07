# Material de videografía

La sección se configura en `VIDEO_GROUPS`, al principio de `js/main.js`.
Los grupos se ordenan automáticamente por cantidad de videos, de mayor a menor.
En caso de empate se conserva el orden de la configuración.

Organización prevista (14 videos):

- Grupo Lorena: 4.
- RedOpt: 4, uno de Aire Nordico, Clínica Bariátrica, Pulso shop y Óptica Focus Plus.
- Shopping Center: 2.
- Emprendimientos: 2, uno de Buns y uno de Pikemos.
- Imperial Autos: 1.
- Mis Huellas UGB: 1.

Puedes copiar aquí las carpetas de tu material conservando sus nombres.
Después completa `src` con la ruta exacta de cada archivo, usando `/`:

```js
{ t: "Título del proyecto", c: "Grupo Lorena", src: "videos/Grupo Lorena/nombre-real.mp4", yt: "", poster: "" }
```

Para YouTube, completa `yt` con el ID y deja `src` vacío.
`poster` permite agregar una portada y `t` cambiar el título que aparece en la lista.
Con `src` y `yt` vacíos aparece una portada provisional, sin solicitar archivos inexistentes.
Los archivos de video todavía no están incluidos en este repositorio.
