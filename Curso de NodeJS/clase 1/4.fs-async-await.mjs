import { readFile } from "node:fs/promises";

  console.log("Leyendo el primer file");
  const text = await readFile("./file.txt", "utf-8");
  console.log("primer texto:", text);

  console.log("Ejecutando cosas mientras lee el primer texto");

  console.log("Leyendo el segundo file");
  const secondText = await readFile("./secondFile.txt", "utf8");
  console.log(secondText);
