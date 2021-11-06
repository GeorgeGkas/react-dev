export function normalizeDiacritics(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

export function compareLocaleStrings(a, b) {
  const a_normalized = normalizeDiacritics(a.toLocaleLowerCase())
  const b_normalized = normalizeDiacritics(b.toLocaleLowerCase())

  return a_normalized.localeCompare(b_normalized)
}