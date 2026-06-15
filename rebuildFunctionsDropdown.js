function rebuildFunctionsDropdown (type) {

    const display = FORMSHEET.getRange(TE_DISPLAY);

    try {

        let options = [];

        if (type == "edit") {
            options = ['Functions', 'Submit edit title', 'Add issue', 'Submit issue edits', 'Delete this title', 'Cancel'];
        }
        else if (type == "issue") {
            options = ['Functions', 'Cancel'];
        }
        else {
            options = ['Functions', 'Submit new title', 'Cancel'];
        }

        const functionsRange = FORMSHEET.getRange(TE_FUNCTIONS_RANGE);
        functionsRange.clearDataValidations()
            .clearContent();

        const functionsRule = SpreadsheetApp.newDataValidation()
            .requireValueInList(options, true)
            .setAllowInvalid(false)
            .build();

        SpreadsheetApp.flush();

        functionsRange.setDataValidation(functionsRule)
            .setValue('Functions');

        return true;

    } catch (error) {
        display.setValue ("Error getting functions: " + error);
        return false;
    }
}