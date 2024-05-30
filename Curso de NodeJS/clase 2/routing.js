const http = require("node:http");
const dittoJSON = require("pokemon/ditto.json");
const { on } = require("node:events");
const processRequest = (req, res) => {
  const { method, url } = req;
  switch (method) {
    case "GET":
      switch (url) {
        case "/":
          res.setHeader("Content-Type", "text/html");
          res.end("<h1>Home Page</h1>");
          break;
        case "/pokemon/ditto":
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(dittoJSON));
          break;
        default:
          res.statusCode = 404; // ERROR
          res.end("Error 404 not found");
          break;
      }
      break;
    case "POST":
      switch (url) {
        case '/pokemon':
            let body = '';
            req.on("data", (chunk) => {
                body += chunk.toString();
            })
            req.on("end", () => {
                const data = JSON.parse(body);
                // LLamo a la BDD
                res.writeHead(201, {'Content-Type':'application/json'});
                res.end(JSON.stringify(data));
            })
            break;
        default:
          res.statusCode = 404; // ERROR
          res.end("Error 404 not found");
          break;
      }
      break;
  }
};
const server = http.createServer(processRequest);
server.listen(3000, () => {
  console.log("Server listening on port: http://localhost:3000");
});
