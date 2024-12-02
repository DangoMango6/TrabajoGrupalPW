export const calcularPrecioConDescuento = (precio, descuento) => {
  if (typeof precio !== 'number' || precio <= 0) {
    return 0; // Retorna 0 si el precio no es válido
  }
  if (typeof descuento !== 'number' || descuento <= 0) {
    return precio; // Retorna el precio completo si no hay descuento válido
  }
  return precio - (precio * descuento) / 100;
};
