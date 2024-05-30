const express = require("express");
const movies = require("./movies.json");
const app = express();
const crypto = require("node:crypto");
const cors = require("cors");
const { validateMovie, validatePartialMovie } = require("./schemas/movies");
const { date } = require("zod");
const { callbackify } = require("node:util");
const e = require("express");
//const {validatePartialMovie } = require("./schemas/movies");

//URLS DE ACCESO A LA API


app.disable("x-powered-by");
app.use(express.json()); // Para parsear JSON
app.use(cors({
  origin: (origin,callback) => {
    const ACCESS_ORIGIN = [
      "http://localhost:8080",
      "http://localhost:5432",
      "http://localhost:8081",
    ];
    if(ACCESS_ORIGIN.includes(origin)) {
      return callback(null, true);
    }
    if(!origin) {
      return callback(null,true);
    }
    return callback(new Error("Not allowed by CORS"));
  }
}));
//METODOS GET DE LA API

app.get("/", (req, res) => {
  res.json({ message: "Hola mundo" });
});

app.get("/movies", (req, res) => {
  // const origin = req.headers.origin;
  // if (ACCESS_ORIGIN.includes(origin)) {
  //   res.header("Access-Control-Allow-Origin", origin);
  // }
  const { genre } = req.query;
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
    return res.json(filteredMovies);
  }
  res.json(movies);
});

app.get("/movies/:id", (req, res) => {
  // Parametro dinamico (/:id) path-to-regexp
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);
  if (movie) {
    return res.json(movie); // Si encontro la movie por id, return
  }
  res.status(404).json({ message: "Movie not found" });
});

//METODO DELETE
app.delete("/movies/:id", (req, res) => {
  // const origin = req.headers.origin;
  // if (ACCESS_ORIGIN.includes(origin) | !origin) {
  //   res.header("Access-Control-Allow-Origin", origin);
  // }
  const { id } = req.params;
  const movieIndex = movies.findIndex(movie => movie.id === id);

  if(movieIndex === -1) {
    return res.status(404).json({message: "Movie not found"});
  }
  movies.splice(movieIndex, 1);
  return res.json({message: "Movie deleted"});
});

//METODO OPTION PARA EL CORS
// app.options("/movies/:id", (req, res) => {
//   const origin = req.headers.origin;
//   if(ACCESS_ORIGIN.includes(origin)) {
//     res.header("Access-Control-Allow-Origin", origin);
//     res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   }
//   res.send(200);
// });

//METODOS POST
app.post("/movies", (req, res) => {
  const result = validateMovie(req.body);
  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }
  // Se usara mas adeltante en BDD
  const newMovie = {
    id: crypto.randomUUID(), //uuid v4
    ...result.data,
  };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

//METODOS PATCH
app.patch("/movies/:id", (req, res) => {
  const { id } = req.params;
  const result = validatePartialMovie(req.body);
  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }
  const updateMovie = {
    ...movies[movieIndex],
    ...result.data,
  };
  movies[movieIndex] = updateMovie;

  return res.json(updateMovie);
});

//CONFIGURACION FINAL PARA EXPRESS
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log("server listening on port http://localhost:" + PORT);
});

app.use((req, res) => {
  res.status(404).send("<h1>Error 404</h1>");
});