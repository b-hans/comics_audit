function isNumeric(val) {
  return typeof val !== 'boolean' && val !== null && val.toString().trim() !== '' && isFinite(Number(val));
}
