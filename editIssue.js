function editIssue(params) {

    const display = params.display;
    const cache = params.cache;
    const rowIndex = params.row;

    try {

        const headers = [
            'Options', 
            "number",
            "month",
            "year",
            "condition",
            "location",
            "online",
            "notes",
            "issue_id"
        ];

        const issueRange = FORMSHEET.getRange(rowIndex, 1, 1, headers.length).getValues()[0];
        const issue_id = issueRange[headers.indexOf('issue_id')];

        const issueSheet = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName("MyComics");

        const issueData = issueSheet.getDataRange().getValues();

        const issueHeaders = issueSheet.getRange(1, 1, 1, issueSheet.getLastColumn())
            .getValues()[0];

        const sheetRow = issueData.findIndex(row => row[issueHeaders.indexOf('id')] == issue_id);

        let sheetRowData = issueData[sheetRow];

        let newRowData = [
            issue_id,
            sheetRowData[1],
            sheetRowData[2],
            issueRange[headers.indexOf('number')],
            issueRange[headers.indexOf('month')],
            issueRange[headers.indexOf('year')],
            getConditionId({display: display, grade: issueRange[headers.indexOf('condition')]}),
            '',
            issueRange[headers.indexOf('location')],
            issueRange[headers.indexOf('online')],
            issueRange[headers.indexOf('notes')]
        ];
          
        issueSheet.getRange(sheetRow+1, 1, 1, newRowData.length)
            .setValues([newRowData]);

        display.setValue ("Edit complete");
        return true;

    } catch (error) {
        display.setValue ("Error: " + error);
        return false;
    }
}