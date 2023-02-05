/* eslint-disable prettier/prettier */
export const FormatearFecha = fechaModificar => {
  const nuevaFecha = new Date(fechaModificar);
  const opciones = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return nuevaFecha.toLocaleDateString('es-ES', opciones);
};
