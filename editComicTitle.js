function editComicTitle (params) {
    const inputTitle = params.title;
    const display = params.display;

    try {

        const myTitle = getComicTitle({
            title: inputTitle
        });

        if (!myTitle.valid) {
            display.setValue ("Not valid");
            return false;
        }

        const title = myTitle.title;
        const publisher = title.publisher.name;
        const pub_value = publisher + " (" + title.publisher.id + ")";

        let testSheet = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName("Copy of Forms");        

        if (!buildEditForm()) {
            display.setValue("Problem");
            return false;
        }

        // rebuild functions menu
        rebuildFunctionsDropdown('edit');

        FORMSHEET.getRange(TE_TITLE_RANGE)
            .setValue(title.title);
        FORMSHEET.getRange(TE_PUBLISHER_DROPDOWN_RANGE)
            .setValue(pub_value);
        FORMSHEET.getRange(TE_VOL_RANGE)
            .setValue(title.volume);
        FORMSHEET.getRange(TE_FIRST_RANGE)
            .setValue(title.num_first);
        FORMSHEET.getRange(TE_LAST_RANGE)
            .setValue(title.num_last);
        FORMSHEET.getRange(TE_ID_RANGE)
            .setValue(title.id);

        let issues = title.issues;

        if (issues.length <= 0) {
            // display.setValue ("No issues");
            return true;
        }
        else {

            // map the array
            let mappedArray = issues.map (row => [
                "Options",
                row.number,
                row.month,
                row.year,
                row.grade,
                row.location,
                usdFormatter.format(row.online),
                row.notes,
                row.id
            ]);

            let startRow = TE_issue_start_row;
            let numRows = mappedArray.length;
            let numCols = mappedArray[0].length;

            FORMSHEET.insertRowsAfter(startRow, numRows);

            // set the condition dropdowns
            const conditionColNum = 5;
            const conditions = getConditions();

            if (conditions.valid) {
                let dropdown = conditions.dropdown;
                dropdown.unshift("Select one");
                const conditionRule = SpreadsheetApp.newDataValidation()
                    .requireValueInList(dropdown, true)
                    .setAllowInvalid(false)
                    .build();

                SpreadsheetApp.flush();

                FORMSHEET.getRange (startRow, conditionColNum, numRows, 1)
                    .setDataValidation(conditionRule);

            }

            // set the options here
            let optionsRule = SpreadsheetApp.newDataValidation()
                .requireValueInList(["Options", "Edit", "Delete"], true)
                .setAllowInvalid(false)
                .build();

            SpreadsheetApp.flush();

            FORMSHEET.getRange(startRow, 1, numRows, 1)
                .setDataValidation(optionsRule);

            FORMSHEET.getRange(startRow, 3, numRows, 1)
                .setDataValidation(MONTHS_RULE);

            try {
                FORMSHEET.getRange(startRow, 1, numRows, numCols)
                    .setValues(mappedArray)
                    .setFontColor("black")
                    .setFontSize(10)
                    .setHorizontalAlignment("left");

                let colAlignments = [
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

                for (let i=0; i<colAlignments.length; i++) {
                    FORMSHEET.getRange(startRow, i+1, numRows, 1)
                        .setHorizontalAlignment(colAlignments[i])
                        .setVerticalAlignment('top');
                }

                FORMSHEET.getRange(startRow, 9, numRows, 1)
                    .setFontColor('#f3f3f3');

                // set notes as a wrap
                FORMSHEET.getRange (startRow, 8, numRows, 1)
                    .setWrap(true)
                    .setHorizontalAlignment('left');

                return true;

            } catch (error) {
                display.setValue ("Error: " + error);
                return false;
            }

        }

    } catch (error) {
        display.setValue ("Error getting title edit: " + error);
        return false;
    }
}