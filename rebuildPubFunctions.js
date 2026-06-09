function rebuildPubFunctions (params) {

    const type = params.type;
    const display = params.display;

    try {

        let options = [];

        if (type == "edit") {
            options = ['Options', 'Submit edit publisher', 'Delete publisher', 'Cancel'];
        }
        else {
            options = ['Options', 'Submit new publisher', 'Cancel'];
        }

        const functionsRange = FORMSHEET.getRange(PUB_FUNCTIONS_RANGE);
        functionsRange.clearDataValidations()
            .clearContent();

        const functionsRule = SpreadsheetApp.newDataValidation()
            .requireValueInList(options, true)
            .setAllowInvalid(false)
            .build();

        SpreadsheetApp.flush();

        functionsRange.setDataValidation(functionsRule)
            .setValue(options[0]);

        return true;
    } catch (error) {
        display.setValue ("Error getting new functions: " + error);
        return false;
    }
}