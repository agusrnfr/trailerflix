require('dotenv').config(); // Leer las variables del .env

const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

// Usar las variables del .env
const PUERTO = process.env.PORT;
const DATA_PATH = process.env.DATA_PATH;

// Leer el archivo JSON
const TRAILERFLIX = JSON.parse(
	fs.readFileSync(path.join(__dirname, process.env.DATA_PATH), "utf-8")
);

// Función para normalizar textos
const normalizeString = (str) => {
	return String(str)
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/\s/g, "");
};

const compareStrings = (str1, str2, exactMatch = false) => {
	if (exactMatch) {
		return normalizeString(str1) === normalizeString(str2);
	}
	return normalizeString(str1).includes(normalizeString(str2));
};

// Endpoint: Ruta raíz
// Muestra un mensaje de bienvenida a la API
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Bienvenidas a Trailerflix</title>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f5f5f5; text-align: center; padding: 50px; }
        h1 { color: #e50914; }
      </style>
    </head>
    <body>
      <h1>🎬 Catálogo de Trailerflix</h1>
      <h2>Ingenias: Pre-entrega 1</h2>
    </body>
    </html>
  `);
});

// Endpoint: Búsqueda por catálogo
// Devuelve TODO trailerflix.json
app.get("/catalogo", (req, res) => {
	res.json(TRAILERFLIX);
});

// Endpoint: Búsqueda por título
// Devuelve películas y/o series cuyo título contenga parcialmente el texto enviado
app.get("/titulo/:title", (req, res) => {
	const title = req.params.title;

	const movies = TRAILERFLIX.filter((movie) =>
		compareStrings(movie.titulo, title)
	);

	if (movies.length === 0) {
		return res.json({ message: "No se encontraron resultados para el título que estás buscando" });
	}
	res.json(movies);
});

// Endpoint: Búsqueda por categoría
// Devuelve todo el contenido filtrado por categoría (serie o película) según el parámetro enviado.
app.get("/categoria/:cat", (req, res) => {
	const cat = req.params.cat;

	const movies = TRAILERFLIX.filter((movie) =>
		compareStrings(movie.categoria, cat, true)
	);

	if (movies.length === 0) {
		return res.json({ message: "No se encontraron resultados para la categoría que estás buscando" });
	}
	res.json(movies);
});

// Endpoint: Búsqueda por actor/actriz en el reparto
// Devuelve todo el contenido filtrado por actores
app.get("/reparto/:act", (req, res) => {

	const act = req.params.act;

	const movies = TRAILERFLIX.filter((movie) =>
		compareStrings(movie.reparto, act)
	).map((movie) => {
		return {
			titulo: movie.titulo,
			reparto: movie.reparto,
		};
	});

	if (movies.length === 0) {
		return res.json({ message: "No se encontraron coincidencias para la actriz o el actor que buscas en TrailerFlix" });
	}
	res.json(movies);
});

// Endpoint: GET /trailer/:id
// Devuelve la URL del tráiler correspondiente al ID de una película o serie
// Si no hay tráiler disponible, retorna un mensaje en formato JSON notificando su ausencia
app.get("/trailer/:id", (req, res) => {

	const id = req.params.id;

	if (isNaN(id)) {
        return res.status(400).send('El ID debe ser un número válido');
    }

	const movie = TRAILERFLIX.find((movie) => compareStrings(movie.id, id, true));

	if (!movie) {
		return res.json({ message: "No se encontraron resultados" });
	}

	else if (!movie.trailer) {
		return res.json({ message: "No se encontro trailer" });
	}

	res.json({
		id: movie.id,
		titulo: movie.titulo,
		trailer: movie.trailer,
	});
});

app.use((req, res) => {
	res.status(404).send("¡Multiplícate por cero! Esta ruta no existe. 😕");
});

app.listen(PUERTO, () => {
	console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});
