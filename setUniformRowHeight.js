function setUniformRowHeight() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Forms");
  var totalRows = sheet.getMaxRows();
  var newHeight = 20; // Height in pixels

  // Parameters: startRow, numRows, height
  sheet.setRowHeights(1, totalRows, newHeight);
}
