require("dotenv").config();

const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT;

const TRAILERFLIX = JSON.parse(
	fs.readFileSync(path.join(__dirname, process.env.DATA_PATH), "utf-8")
);

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

app.get("/", (req, res) => {
	res.send("Bienvenido a Trailerflix API");
});

app.get("/catalogo", (req, res) => {
	res.json(TRAILERFLIX);
});

app.get("/titulo/:title", (req, res) => {
	const title = req.params.title;

	const movies = TRAILERFLIX.filter((movie) =>
		compareStrings(movie.titulo, title)
	);

	if (movies.length === 0) {
		return res.json({ message: "No se encontraron resultados" });
	}
	res.json(movies);
});

app.get("/categoria/:cat", (req, res) => {
	const cat = req.params.cat;

	const movies = TRAILERFLIX.filter((movie) =>
		compareStrings(movie.categoria, cat, true)
	);

	if (movies.length === 0) {
		return res.json({ message: "No se encontraron resultados" });
	}
	res.json(movies);
});

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
		return res.json({ message: "No se encontraron resultados" });
	}
	res.json(movies);
});

app.get("/trailer/:id", (req, res) => {
	const id = req.params.id;

	const movie = TRAILERFLIX.find((movie) => compareStrings(movie.id, id, true));

	if (!movie) {
		return res.json({ message: "No se encontraron resultados" });
	}

	if (!movie?.trailer) {
		return res.json({ message: "No se encontraron resultados" });
	}

	res.json({
		id: movie.id,
		titulo: movie.titulo,
		trailer: movie.trailer,
	});
});

app.use((req, res) => {
	res.status(404).send("Ruta no encontrada");
});

app.listen(PORT, () => {
	console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
