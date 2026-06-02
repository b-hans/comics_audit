function deleteIssue (params) {

    const display = params.display;
    const id = params.id;

    try {

        const titleSheet = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName("MyComics");

        const data = titleSheet.getDataRange().getValues();
        const headers = data.shift();

        //find the row
        const rowIndex = data.findIndex(
            row => row[headers.indexOf('id')] == id
        );

        if (rowIndex >= 0) {
            titleSheet.deleteRow(rowIndex + 2);
            return true;
        }
        else {
            display.setValue ("Did not find that issue");
            return false;
        }

    } catch (error) {
        display.setValue ("Error deleting issue: " + error);
        return false;
    }
}