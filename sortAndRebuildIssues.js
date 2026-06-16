function sortAndRebuildIssues (params) {
    const display = params.display;

    try {

        const sheet = FORMSHEET;
        const start = TE_issue_start_row;
        const last = sheet.getLastRow();
        const numRows = last - start + 1;
        const numCols = 9;
        const range = sheet.getRange(TE_issue_start_row, 1, numRows, numCols)
            .getValues();

        console.log (range);

        display.setValue ("In rebuild");
        return false;
    } catch (error) {
        display.setValue ("Error sorting issues: " + error);
        return false;
    }
}