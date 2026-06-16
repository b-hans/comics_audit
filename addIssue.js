function addIssue () {

    const display = getDisplay("TE");
    display.setValue("Working....");

    try {
        const sheet = FORMSHEET;
        const conditions = getConditions();
        const newOptions = ['Options', 'Insert it', 'Cancel insert'];

        // insert a new row
        sheet.insertRowBefore(TE_issue_start_row);

        // add the options dropdown
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

        // set the styles for the columns
        let colAlignments = [
            "center",
            "center",
            "left",
            "left",
            "left",
            "left",
            "right",
            "left",
        ];

        for (let i=0; i<colAlignments.length; i++) {
            FORMSHEET.getRange(TE_issue_start_row, i+1)
                .setHorizontalAlignment(colAlignments[i])
                .setFontColor("black");
        }

        // set the condition dropdowns
        const conditionColNum = 5;

        if (conditions.valid) {
            let dropdown = conditions.dropdown;
            dropdown.unshift("Select one");
            const conditionRule = SpreadsheetApp.newDataValidation()
                .requireValueInList(dropdown, true)
                .setAllowInvalid(false)
                .build();

            SpreadsheetApp.flush();

            FORMSHEET.getRange (TE_issue_start_row, conditionColNum)
                .setDataValidation(conditionRule)
                .setValue(dropdown[0]);

        }

        // set months as a dropdown
        let monthRange = FORMSHEET.getRange(TE_issue_start_row, 3)
            .clearDataValidations()
            .clearContent();

        SpreadsheetApp.flush();

        monthRange.setDataValidation(MONTHS_RULE)
            .setValue(MONTHS_ARRAY[0]);

        // set wrap for notes column
        FORMSHEET.getRange(TE_issue_start_row, TE_NOTES_COLUMN)
            .setWrap(true);

        rebuildFunctionsDropdown('issue');

        display.setValue("");

        return true;


    } catch (error) {
        display.setValue ("Error: " + error);
        return false;
    }

}