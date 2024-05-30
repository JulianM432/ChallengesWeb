const fs = require("node:fs/promises");
(
    async () => {
  console.log("Leyendo el primer file");
  const text = await fs.readFile("./file.txt", "utf-8");
  console.log("primer texto:", text);

  console.log("Ejecutando cosas mientras lee el primer texto");

  console.log("Leyendo el segundo file");
  const secondText = await fs.readFile("./secondFile.txt", "utf8");
  console.log(secondText);
})
();
