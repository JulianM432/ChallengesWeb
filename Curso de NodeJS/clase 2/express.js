const express = require("express");
const app = express();
app.disable("x-powered-by"); // IMPORTANTISIMO POR SEGURIDAD

const PORT = process.env.PORT ?? 3000;

app.use(express.json()); // Forma nativa de lo que esta debajo

// // Logica de un MiddleWare
// app.use((req, res, next) => {
//   if (req.method !== "POST") return next();
//   if (req.headers["content-type"] !== "application/json") return next();
//   // Solo request con Post y content types de json
//   let body = "";

//   req.on("data", (chunk) => {
//     body += chunk.toString();
//   });
//   req.on("end", () => {
//     const data = JSON.parse(body);
//     data.timestamp = Date.now();
//     // Muta la request y se ingresa la informacion en el req.body
//     req.body = data;
//     next();
//   });
// });

app.get("/", (req, res) => {
  res.send("<h1>Hola mundo</h1>");
});
app.get("/pokemon/ditto", (req, res) => {
  const dittoJSON = require("./pokemon/ditto.json");
  res.json(dittoJSON);
});

app.listen(PORT, () => {
  console.log("Server listening to http://localhost:" + PORT);
});

app.post("/pokemon", (req, res) => {
    // Aca podriamos guardar en BDD (en req.body)
    res.status(201).json(req.body);
});

// En caso de no reconocer un metodo y un statusCode | Es la ultima que va a llegar
app.use((req, res) => {
  res.status(404).send("<h1>Error 404</h1>");
});
