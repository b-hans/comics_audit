function sortAndRebuildIssues (params) {
    const display = params.display;

    try {

        const sheet = FORMSHEET;
        const start = TE_issue_start_row;
        const last = sheet.getLastRow();
        const numRows = last - start + 1;

        if (numRows < 2) {
            return true;
        }
        
        const numCols = 9;
        const range = sheet.getRange(TE_issue_start_row, 1, numRows, numCols);
        const data = range.getValues();

        data.sort((a, b) => a[1] - b[1]);

        range.setValues(data);

        return true;
    } catch (error) {
        display.setValue ("Error sorting issues: " + error);
        return false;
    }
}