function issueValid (params) {

    /*
        cache
        display
        options cell
        options text

    */

    const cache = params.cache;
    const display = params.display;
    const optionsColumn = params.optionsColumn;
    const optionsRow = params.optionsRow;
    const optionsText = params.optionsText;

    const sheet = FORMSHEET;

    try {

        const data = sheet.getRange(optionsRow, 1, 1, TE_ISSUE_ID_COLUMN+1)
            .getValues()[0];

        console.log (data);

        sheet.getRange(optionsRow, optionsColumn, 1, 1)
            .setValue(optionsText);

        display.setValue ("in validation row no.: " + optionsRow + " : " + data[TE_ISSUE_ID_COLUMN]);

        return false
    } catch (error) {
        display.setValue ("Error validating issue: " + error);
        return false;
    }
}