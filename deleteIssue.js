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
        }
        else {
            display.setValue ("Did not find that issue");
            return false;
        }

        let start = TE_issue_start_row;
        let end = FORMSHEET.getLastRow();
        let numRows = end - start + 1;

        // find and delete the row on FORMSHEET
        let range = FORMSHEET.getRange(start, 1, numRows, TE_issue_id_column);
        let rangeData = range.getValues();

        let deleteIndex = rangeData.findIndex(row => row[TE_issue_id_column-1] == id);
        rangeData.splice(deleteIndex, 1);

        range.clearContent();

        if (rangeData.length < 1) {
            range.clearDataValidations();
        }
        else {
            range = FORMSHEET.getRange(start, 1, rangeData.length, TE_issue_id_column)
                .setValues(rangeData);

            let deleteRowIndex = start + rangeData.length;

            FORMSHEET.deleteRow(deleteRowIndex);

        }

        return true;


    } catch (error) {
        display.setValue ("Error deleting issue: " + error);
        return false;
    }
}