require("dotenv").config();

const express = require("express");
const app = express();
const fs = require("fs");

const PORT = process.env.PORT;

const TRAILERFLIX = JSON.parse(fs.readFileSync(process.env.DATA_PATH, "utf-8"));

app.get("/", (req, res) => {
	res.send("Bienvenido a TrailerFlix API");
});

app.get("/catalogo", (req, res) => {
	res.json(TRAILERFLIX);
});

app.get("/titulo/:title", (req, res) => {
	const title = req.params.title;

	const movies = TRAILERFLIX.filter((movie) =>
		movie.titulo.toLowerCase().includes(title.toLowerCase())
	);

	if (movies.length === 0) {
		return res.status(404).json({ error: "No se encontraron resultados" });
	}
	res.json(movies);
});

app.get("/categoria/:cat", (req, res) => {
	const cat = req.params.cat;

	const movies = TRAILERFLIX.filter(
		(movie) => movie.categoria.toLowerCase() === cat.toLowerCase()
	);

	if (movies.length === 0) {
		return res.status(404).json({ error: "No se encontraron resultados" });
	}
	res.json(movies);
});

app.get("/reparto/:act", (req, res) => {
	const act = req.params.act;

	const movies = TRAILERFLIX.filter((movie) =>
		movie.reparto.toLowerCase().includes(act.toLowerCase())
	).map((movie) => {
		return {
			titulo: movie.titulo,
			reparto: movie.reparto,
		};
	});

	if (movies.length === 0) {
		return res.status(404).json({ error: "No se encontraron resultados" });
	}
	res.json(movies);
});

app.get("/trailer/:id", (req, res) => {
	const id = req.params.id;

	const movie = TRAILERFLIX.find((movie) => movie.id == id);

	if (!movie) {
		return res.status(404).json({ error: "No se encontraron resultados" });
	}

	if (!movie?.trailer) {
		return res.status(404).json({ error: "No se encontró el trailer" });
	}

	res.json({
		id: movie.id,
		titulo: movie.titulo,
		trailer: movie.trailer,
	});
});

app.listen(PORT, () => {
	console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
