function addIssue () {

    try {
        const sheet = FORMSHEET;
        const conditions = getConditions();
        const newOptions = ['Options', 'Insert it', 'Cancel insert'];

        sheet.insertRowBefore(TE_issue_start_row);

        const issueRule = SpreadsheetApp.newDataValidation()
            .requireValueInList(newOptions, true)
            .setAllowInvalid(false)
            .build();

        const optionsRange = sheet.getRange(TE_issue_start_row, 1, 1, 1);

        optionsRange
            .clearDataValidations()
            .clearContent();

        SpreadsheetApp.flush();

        optionsRange
            .setDataValidation(issueRule)
            .setValue(newOptions[0]);

        return true;


    } catch (error) {
        ui.alert ("Error: " + error);
        return false;
    }

}