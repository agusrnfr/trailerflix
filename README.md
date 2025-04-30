# 🎬 Trailerflix API

**Trailerflix** es una API REST desarrollada con Node.js y Express que permite explorar un catálogo de películas/series a través de múltiples rutas.

## 🚀 Características

- 📚 Listado completo del catálogo.
- 🔍 Búsqueda por título.
- 🎭 Filtrado por películas o series.
- 👥 Búsqueda por actor/actriz en el reparto.
- 🎞 Acceso al trailer a tráves del ID.

## 📖 Estructura de los Datos

De cada película/serie se contiene la siguiente información:
- **id**: Identificador único de la película o serie.
- **poster**: Enlace a la imagen del poster de la película/serie.
- **titulo**: Título de la película o serie.
- **categoria**: Si se trata de una película o serie.
- **tags**: Palabras clave asociadas a la película o serie.
- **resumen**: Breve descripción de la película o serie.
- **temporadas**: Número de temporadas (si es una serie).
- **duracion**: Duración de la película o serie (si es una película).
- **reparto**: Actores/actrices que participan en la película/serie.
- **trailer**: Enlace al trailer de la película o serie (si está disponible).

## 📦 Instalación

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/agusrnfr/trailerflix.git
   cd trailerflix
   ```
2. Instalá las dependencias:
    ```bash
    npm install
    ```
3. Ejecutá el servidor:
   * En modo desarrollo (con nodemon):
        ```bash
        npm run dev
        ```
   * En modo producción:
        ```bash
        npm start
        ```
4. Accedé a la API a través de un navegador o herramienta de pruebas en la siguiente URL:
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

- **Agustín Rojas** - [agusrnfr](https://github.com/agusrnfr)
