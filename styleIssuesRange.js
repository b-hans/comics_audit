function styleIssuesRange (params) {

    const display = params.display;
    const range = params.range;

    try {

        const colAlignments = [
            "center",
            "center",
            "left",
            "left",
            "left",
            "left",
            "right",
            "right", 
            "center"
        ];

        const conditions = getConditions();

        const conditionsRule = SpreadsheetApp.newDataValidation()
            .requireValueInList(conditions.dropdown, true)
            .setAllowInvalid(false)
            .build();

        const numRows = range.getNumRows();


        for (let i=0; i<colAlignments.length; i++) {
            range.setHorizontalAlignment(colAlignments[i])
                .setVerticalAlignment('top');
        }

        range.setBackground('#f3f3f3')
            .setFontFamily('Arial')
            .setFontSize(10);

        // set notes as a wrap
        range.offset(0, 7, numRows, 1)
            .setWrap(true)
            .setHorizontalAlignment('left');

        SpreadsheetApp.flush();

        // months
        range.offset(0, 2, numRows, 1)
            .setDataValidation(monthValidation);

        // value
        range.offset(0, 6, numRows, 1)
            .setNumberFormat("$#,##0.00");


        SpreadsheetApp.flush();

        range.offset(0, 4, numRows, 1)
            .setDataValidation(conditionsRule);

        return true;

    }
    catch (error) {
        display.setValue("Problem styling issues: " + error);
        return false;
    }

}