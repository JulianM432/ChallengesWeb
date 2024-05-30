const http = require("node:http");
const fs = require("node:fs");
const puerto = process.env.PORT ?? 3000;

const processRequest = (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  if (req.url === "/") {
    res.statusCode = 200; // OK
    res.end("Home page");
  } else if (req.url === "/penguins.png") {
    fs.readFile("./penguins.png", (err, data) => { // DATA ES UN BUFFER, DONDE LEE EN BINARIO Y SE PUEDE TRANSMITIR DATOS DE ESTA MANERA POR EL NAVERGADOR
      if (err) {
        res.statusCode = 500;
        res.end("<h1>Internal server error</h1>");
      } else {
        res.setHeader('Content-Type', 'image/png');
        res.end(data);
      }
    });
  } else if (req.url === "/Contacto") {
    res.statusCode = 200;
    res.end("Contacto");
  } else {
    res.statusCode = 404; // ERROR
    res.end("Error 404 not found");
  }
};
const server = http.createServer(processRequest);

server.listen(puerto, () => {
  console.log("Server escuchando en el puerto http://localhost:" + puerto);
});
