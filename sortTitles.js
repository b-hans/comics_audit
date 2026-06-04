function sortTitles (params) {
    const display = params.display;
    const sheet = SpreadsheetApp.getActiveSpreadsheet()
        .getSheetByName("Title table");
    
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn())
        .getValues()[0];
    
    try {

        const sortRule1 = headers.indexOf ("Title") + 1;
        const sortRule2 = headers.indexOf ("publisher_id") + 1;
        const sortRule3 = headers.indexOf ("Volume") + 1;

        const sortRules = [
            {column: sortRule1, ascending: true},
            {column: sortRule2, ascending: true},
            {column: sortRule3, ascending: true},
        ];

        const sortRange = sheet.getRange (2, 1, sheet.getLastRow()-1, sheet.getLastColumn());

        sortRange.sort(sortRules);

        return true;
    } catch (error) {
        display.setValue ("Error sorting titles: " + error);
        return false;
    }
}