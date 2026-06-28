function isNotValidCurrency(str) {
  // Matches optional $, thousands commas, and exactly 2 decimal cents
  const currencyRegex = /^\$?(([1-9]\d{0,2}(,\d{3})*)|0)?(\.\d{2})?$/;
  
  // Invert the result: returns true if the string does NOT match the rules
  return !currencyRegex.test(str.trim());
}