function needed (params) {

    const display = params.display;
    const cache = params.cache;
    const type = params.type;

    try {

        // get and cache current issues
        display.setValue ("Working....");

        let start = TE_issue_start_row;
        let end = FORMSHEET.getLastRow();
        let numRows = end - start + 1;

        let currentIssues = FORMSHEET.getRange(start, 1, numRows, FORMSHEET.getLastColumn())
            .getValues()[0];

        console.log (currentIssues);

        display.setValue ("Test: " + start + " : " + numRows);
        return true;
    } catch (error) {
        display.setValue ("Error getting needed: " + error);
        return false;
    }

}