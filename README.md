# 🎬 Trailerflix API

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js) ![Express](https://img.shields.io/badge/Express.js-4.x-lightgrey?logo=express) ![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Status](https://img.shields.io/badge/status-active-brightgreen) ![PRs](https://img.shields.io/badge/PRs-welcome-orange)


**Trailerflix** es una API REST desarrollada con **Node.js** y **Express** que permite explorar un catálogo de películas y series a través de múltiples rutas organizadas.

## 🚀 Características

- 📚 Listado completo del catálogo.
- 🔍 Búsqueda por título.
- 🎭 Filtrado por películas o series.
- 👥 Búsqueda por actor/actriz en el reparto.
- 🎞 Acceso al trailer a tráves del ID.

## 📖 Estructura de los Datos

De cada película o serie se contiene la siguiente información:
- **id**: Identificador único de la película o serie.
- **poster**: Enlace a la imagen del poster de la película o serie.
- **titulo**: Título de la película o serie.
- **categoria**: Si se trata de una película o serie.
- **tags**: Palabras clave asociadas a la película o serie.
- **resumen**: Breve descripción de la película o serie.
- **temporadas**: Número de temporadas (si es una serie).
- **duracion**: Duración de la película o serie (si es una película).
- **reparto**: Actores/actrices que participan en la película o serie.
- **trailer**: Enlace al trailer de la película o serie (si está disponible).

## 📦 Instalación

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/Chinapaoletti/trailerflix-api
   cd trailerflix-api
   ```
2. Instalá las dependencias:
    ```bash
    npm install
    ```
   O podes instalar express, dotenv y nodemon por separado:
   
    ```bash
   npm install express
   npm install dotenv
   npm install --save-dev nodemon
    ```
4. Ejecutá el servidor:
   * En modo desarrollo (con nodemon):
        ```bash
        npm run dev
        ```
   * En modo producción:
        ```bash
        npm start
        ```
5. Accedé a la API a través de un navegador o herramienta de pruebas en la siguiente URL:
   ```bash
   http://localhost:3008/
   ```

## 🔧 Endpoints

| Método | Endpoint          | Descripción                                                                                                                                     |
| ------ | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/`               | Mensaje de bienvenida                                                                                                                           |
| `GET`  | `/catalogo`       | Devuelve el catálogo completo de películas/series.                                                                                              |
| `GET`  | `/titulo/:title`  | Retorna películas/series que contienen la cadena proporcionada en el título.                                                                    |
| `GET`  | `/categoria/:cat` | Retorna todas las películas o todas las series de acuerdo al parámetro enviado.                                                                 |
| `GET`  | `/reparto/:act`   | Devuelve las películas/series con un actor/actriz específico. La respuesta solo contiene el título y el reparto de las películas/series.        |
| `GET`  | `/trailer/:id`    | Obtiene el trailer de la película/serie con el ID proporcionado. La respuesta incluye solo la ID, el título y el enlace al trailer (si existe). |

## 👥 Desarrolladoras

- **Agostina Paoletti** - [agostinapaoletti](https://github.com/Chinapaoletti) 
- **Agustina Rojas** - [agusrnfr](https://github.com/agusrnfr)
- **Karina Chilque** - [karinachilque]()
