const fs = require("node:fs")

const stats = fs.statSync('./file.txt')

console.log(
    stats.isFile(), // Si es archivo
    stats.isDirectory(), // Si es un directorio
    stats.isSymbolicLink(), // Si es un enlace simbolico
    stats.size // Espacio que posee
)