export const parseLocalDate = ({ value }: { value: any }) => {
  if (!value) return undefined;

  let year: number, month: number, day: number;

  // Si ya es un Date, extraer componentes UTC (puede tener offset)
  if (value instanceof Date) {
    year = value.getUTCFullYear();
    month = value.getUTCMonth() + 1; // getUTCMonth() retorna 0-11
    day = value.getUTCDate();
  } else {
    // Si es string, parsear componentes
    const dateString = value.toString().split('T')[0]; // Remover parte de tiempo si existe
    [year, month, day] = dateString.split(/[-/]/).map(Number);
  }

  // Crear fecha en hora local (mes es 0-indexed en JavaScript)
  const date = new Date(year, month - 1, day);
  date.setHours(0, 0, 0, 0);

  return date;
};
