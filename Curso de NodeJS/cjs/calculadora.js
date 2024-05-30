// MODULO CJS -> COMMON JS | EXPORT IMPORT OBSOLETO

function Suma(a, b) {
  return a + b;
}
function Resta(a, b) {
  return a - b;
}
function Multiplicacion(a, b) {
  return a * b;
}
function Division(a, b) {
  if (b == 0) {
    console.error("No dividir por 0");
  } else {
    return a / b;
  }
}
module.exports = Suma, Resta, Multiplicacion, Division;