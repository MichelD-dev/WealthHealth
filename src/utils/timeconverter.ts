/**
Convertit une date locale en date UTC.
@param {Date|null} date - La date locale à convertir en date UTC.
@returns {Date|null} - La date UTC convertie, ou null si la date passée en paramètre est null.
*/
export default function convertLocalToUTCDate(date: Date | null) {
  if (!date) {
    return date
  }
  date = new Date(date)
  date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  return date
}
