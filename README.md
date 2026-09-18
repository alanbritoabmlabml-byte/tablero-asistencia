# Sistemas y Tableros · Plásticos Carmen

Sitio estático publicado con GitHub Pages por el Departamento de IT de
**Plásticos Carmen S.R.L.**

- **Portada** (`index.html`) — menú de accesos con el mismo diseño y las mismas
  hojas de estilo que el *Portafolio de Reportes BI* (`css/marca.css`,
  `css/base.css`, `css/menu.css`, `css/tema.css`).
- **Tablero de Control de Asistencia v13** (`asistencia/index.html`) — tablero
  de gestión autocontenido, sin dependencias externas.

## Datos

El tablero se publica **sin datos**. El export del Control de Asistencia lo
carga cada usuario desde su equipo y queda guardado sólo en su navegador
(IndexedDB, con respaldo en `localStorage`). Nada se sube a GitHub ni a ningún
servidor: todo el cálculo ocurre en el navegador.

Formato esperado: export ancho del Control de Asistencia, separado por `;`, con
las columnas `CI`, `Nombre`, `Departamento` y una columna por fecha
(`aaaa-mm-dd` o `dd/mm/aaaa`).

Para quitar los datos guardados: **Configuración → Quitar datos**.

## Montarlo dentro del módulo de asistencia

En `asistencia/index.html`, la variable `API_URL` (cerca del inicio del script)
acepta el endpoint que devuelve ese mismo CSV. Si responde, el tablero se carga
solo y no pide el archivo:

```js
var API_URL = '/asistencia/api/export.csv';
```

## Estructura

```
index.html            portada (menú de tarjetas)
asistencia/index.html tablero de Control de Asistencia v13
css/                  marca.css · base.css · menu.css · tema.css
img/                  logotipos, favicons e ilustraciones de las tarjetas
js/portal.js          tema, saludo y buscador de la portada
.nojekyll             GitHub Pages sirve los archivos tal cual
```

## Publicación

GitHub Pages, rama `main`, carpeta raíz (`/`).
