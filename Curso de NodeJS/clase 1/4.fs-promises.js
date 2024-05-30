const fs = require('node:fs/promises');

fs.readFile('./file.txt','utf8').then(text => {
    console.log(text)
})

console.log("En el medio podria estar haciendo operaciones como este console.log(), pero mas complejo")

fs.readFile('./secondFile.txt','utf8').then(text=>{
    console.log(text)
})