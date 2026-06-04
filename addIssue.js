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
            "right",
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

        display.setValue("");

        return true;


    } catch (error) {
        display.setValue ("Error: " + error);
        return false;
    }

}