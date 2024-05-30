const os = require('node:os');

console.log("Sistema: " + os.platform())
console.log("Procesos: "+ os.cpus())
console.log("Memoria : " + os.freemem() / 1024 / 1024);
console.log("Memoria total: " + os.totalmem() / 1024 / 1024)