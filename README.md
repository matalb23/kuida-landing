# Kuida — Landing

Landing estática multilenguaje (ES / EN / PT) para la app **Kuida**, alojada en GitHub Pages.

**Sitio:** https://matalb23.github.io/kuida-landing/

## Estructura

```
index.html        Raíz: redirige al idioma del navegador (fallback ES)
es/ en/ pt/       Una página por idioma, contenido espejado
css/styles.css    Estilos compartidos (mobile-first, modo claro/oscuro)
js/main.js        Contador de visitas (GoatCounter) y descargas (API de GitHub)
assets/           Íconos de la app
.github/workflows/deploy.yml   Deploy automático a Pages
```

## Pendientes antes de lanzar

- [ ] Activar Pages: Settings → Pages → Source: **GitHub Actions** (se activa sola en el primer deploy).
- [ ] Reemplazar el correo de contacto (`hola@kuida.app`) por el real en `es/index.html`, `en/index.html` y `pt/index.html`.
- [ ] Ajustar los textos de "Por qué nace Kuida" a la voz propia.
- [ ] Sumar capturas de pantalla en `assets/screenshots/` y mostrarlas en el hero.
- [ ] En GoatCounter (Settings → Data policy): activar stats públicas para que el contador de visitas sea visible.
- [ ] Compilar el APK (desde el repo de la app): `bunx eas-cli build -p android --profile preview`
- [ ] Crear el release `v1.1.0` y adjuntar el APK — el badge de descargas y el botón se activan solos.

## Contadores

- **Descargas:** badge de shields.io + contador visible vía API pública de GitHub Releases.
- **Visitas:** [GoatCounter](https://www.goatcounter.com/) (gratis para no-comercial, sin cookies).

## Licencia

MIT.
