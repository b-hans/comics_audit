function getNextTitleId (params) {

    const display = params.display;

    try {
        const startRow = 2;
        const idColumn = 1;
    
        const issueSheet = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName("Title table");

        const numRows = issueSheet.getLastRow() - startRow + 1;

        const idArray = issueSheet.getRange (startRow, idColumn, numRows, 1)
            .getValues()
            .flat();

        const largest = Math.max(...idArray);

        return {
            id: largest + 1,
            valid: true,
        }
            

    } catch (error) {
        display.setValue ("Error: " + error);
        return { valid: false }
    }
}