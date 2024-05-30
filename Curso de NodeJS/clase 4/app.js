import express, { json } from "express";
import {moviesRouter} from "./routes/movies.js";

const app = express();
app.disable("x-powered-by");
app.use(json()); // Para parsear JSON

//URLS DE ACCESO A LA API
app.use();

//METODOS GET DE LA API

app.get("/", (req, res) => {
  res.status(200).send("Hola mundo");
});

app.use('/movies', moviesRouter);

//CONFIGURACION FINAL PARA EXPRESS
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log("server listening on port http://localhost:" + PORT);
});

app.use((req, res) => {
  res.status(404).send("<h1>Error 404</h1>");
});