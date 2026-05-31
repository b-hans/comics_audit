function editComicTitle (params) {
    const ui = params.ui;
    const inputTitle = params.title;
    const display = params.display;

    try {

        const myTitle = getComicTitle({
            ui: ui,
            title: inputTitle
        });

        if (!myTitle.valid) {
            ui.alert("Not valid");
            return false;
        }

        const title = myTitle.title;
        const publisher = title.publisher.name;
        const pub_value = publisher + " (" + title.publisher.id + ")";

        let testSheet = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName("Copy of Forms");        

        if (!buildEditForm()) {
            ui.alert("Problem");
            return false;
        }

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
            ui.alert ("No issues");
        }
        else {

            // map the array
            let mappedArray = issues.map (row => [
                "",
                row.number,
                row.month,
                row.year,
                row.grade,
                row.location,
                usdFormatter.format(row.online),
                usdFormatter.format(row.overstreet)
            ]);

            let startRow = TE_issue_start_row;
            let numRows = mappedArray.length;
            let numCols = mappedArray[0].length;

            FORMSHEET.insertRowsAfter(startRow, numRows);

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
                    "right"
                ];

                for (let i=0; i<colAlignments.length; i++) {
                    FORMSHEET.getRange(startRow, i+1, numRows, 1)
                        .setHorizontalAlignment(colAlignments[i]);
                }


            } catch (error) {
                ui.alert ("Error: " + error);
            }


        }


        return true;
    } catch (error) {
        display.setValue ("Error getting title edit: " + error);
        return false;
    }
}