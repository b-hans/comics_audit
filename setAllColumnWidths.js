function setAllColumnsWidth() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Forms");
  const maxColumns = sheet.getMaxColumns(); // Gets the total number of columns in the sheet
  const desiredWidth = 100; // Set your preferred width in pixels
  
  // setColumnWidths(startColumnIndex, numColumns, widthPixels)
  sheet.setColumnWidths(1, maxColumns, desiredWidth);
}
