// MODULO ES - ACTUAL FORMA DE IMPLEMENTAR LOS EXPORT / IMPORTS

export function Suma(a, b) {
  return a + b;
}
export function Resta(a, b) {
  return a - b;
}
export function Multiplicacion(a, b) {
  return a * b;
}
export function Division(a, b) {
  if (b == 0) {
    console.error("No dividir por 0");
  } else {
    return a / b;
  }
}