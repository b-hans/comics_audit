function deleteFormsSheet () {

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Forms");
    var range = sheet.getDataRange();
    
    // 1. Remove all Data Validation (dropdowns, etc.)
    range.clearDataValidations();
    
    // 2. Remove all Conditional Formatting
    sheet.clearConditionalFormatRules();
    
    // 3. Remove all Cell Formatting (styles, colors, borders)
    range.clearFormat();

    range.clearContent();
    
    // 4. Unmerge all merged cells
    range.breakApart();

    range = sheet.getRange(TS_FULLRANGE);

    range.breakApart();


    // 1. Remove all background colors (sets to transparent)
    range.setBackground(null);

    // 2. Remove all borders
    // Arguments: top, left, bottom, right, vertical, horizontal, color, style
    range.setBorder(false, false, false, false, false, false, null, SpreadsheetApp.BorderStyle.SOLID);

    setUniformRowHeight();
    setAllColumnsWidth();

    range = sheet.getRange(TS_FULLRANGE)
        .setFontFamily("Arial")
        .setFontColor("black")
        .setFontSize(10);

    sheet.getRange("A1").activate();


}