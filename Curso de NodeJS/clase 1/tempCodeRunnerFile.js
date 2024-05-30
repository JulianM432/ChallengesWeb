const fs = require('node:fs');

// const text = fs.readFileSync("./file.txt","utf-8"); // LECTURA SYNC ESTATICA
// console.log(text);

fs.readFile('./file.txt','utf-8',(err,text) => {
    console.log(text);
})
console.log("Ejecutando cosas mientras lee el primer texto")
console.log(1+2);
fs.readFile('./secondFile.txt','utf8',(err,text) => {
    console.log(text)
})