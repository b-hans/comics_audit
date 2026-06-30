function styleIssuesRange (params) {

    const display = params.display;
    const range = params.range;
    const data = params.data;
    const type = params.type;

    try {

        if (data) {
            range.setValues(data);
        }

        const colAlignments = [
            "center",
            "center",
            "left",
            "left",
            "left",
            "left",
            "right",
            "left", 
            "center"
        ];

        const headers = {
            Options:    0,
            Number:     1,
            Month:      2,
            Year:       3,
            Condition:  4,
            Location:   5,
            Online:     6,
            Notes:      7,
            id:         8
        };

        const conditions = getConditions();

        const conditionsRule = SpreadsheetApp.newDataValidation()
            .requireValueInList(conditions.dropdown, true)
            .setAllowInvalid(false)
            .build();

        const numRows = range.getNumRows();

        for (let i=0; i<colAlignments.length; i++) {
            range.offset(0, i, numRows, 1).setHorizontalAlignment(colAlignments[i])
                .setVerticalAlignment('top');
        }

        range.setBackground('#f3f3f3')
            .setFontFamily('Arial')
            .setFontColor('black')
            .setFontSize(10);

        // set notes as a wrap
        range.offset(0, headers.Notes, numRows, 1)
            .setWrap(true);

        SpreadsheetApp.flush();

        // months
        range.offset(0, headers.Month, numRows, 1)
            .setDataValidation(monthValidation);

        // value
        range.offset(0, 6, numRows, 1)
            .setNumberFormat("$#,##0.00");


        SpreadsheetApp.flush();

        range.offset(0, headers.Condition, numRows, 1)
            .setDataValidation(conditionsRule);

        range.offset(0, headers.id, numRows, 1)
            .setFontColor('#f3f3f3');

        if (type == "myIssues") {
            SpreadsheetApp.flush();

            range.offset(0, headers.Options, numRows, 1)
                .setDataValidation(issueEditValidation);

        }

        // now apply zebra
        const color1 = "#ffffff";
        const color2 = "#f3f3f3";
        var colors = [];

        const zNumRows = range.getNumRows();
        const zNumCols = range.getNumColumns() - 1;

        const zRange = FORMSHEET.getRange(TE_issue_start_row, 1, zNumRows, zNumCols);

        for (var i=1; i<=zNumRows; i++) {
            var rowColors = [];
            var rowColor = (i %2 === 0) ? color1 : color2;

            for (var j=1; j<=zNumCols; j++) {
                rowColors.push (rowColor);
            }
            colors.push(rowColors);
        }

        zRange.setBackgrounds(colors);


        return true;

    }
    catch (error) {
        display.setValue("Problem styling issues: " + error);
        return false;
    }

}