function showMyIssues (params) {
    
    const display = params.display;
    const cache = params.cache;

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


        // get range
        let delStart = TE_issue_start_row;
        let delEnd = FORMSHEET.getLastRow();
        let delNumRows = delEnd - delStart + 1;

        if (delNumRows > 0) {
            FORMSHEET.deleteRows(delStart, delNumRows);
        }

        let currentIssues = JSON.parse(cache.get("issuesData"));

        if (currentIssues.length > 0) {

            let insertStart = TE_issue_start_row;
            
            let insertRange = FORMSHEET.getRange(
                TE_issue_start_row, 
                1, 
                currentIssues.length, 
                currentIssues[0].length);

            insertRange.setValues(currentIssues)
                    .setFontColor("black")
                    .setFontSize(10)
                    .setFontFamily("Arial")
                    .setVerticalAlignment("top")
                    .setBackground("#f3f3f3")
                    .setHorizontalAlignment("left");

            
            for (let i=0; i<colAlignments.length; i++) {
                FORMSHEET.getRange(TE_issue_start_row, i+1, currentIssues.length, 1)
                    .setHorizontalAlignment(colAlignments[i])
                    .setVerticalAlignment('top');
            }

            FORMSHEET.getRange(TE_issue_start_row, 9, currentIssues.length, 1)
                .setFontColor('#f3f3f3');

            // set notes as a wrap
            FORMSHEET.getRange (TE_issue_start_row, 8, currentIssues.length, 1)
                .setWrap(true)
                .setHorizontalAlignment('left');

            SpreadsheetApp.flush();

            // options
            FORMSHEET.getRange(TE_issue_start_row, 1, currentIssues.length, 1)
                .setDataValidation(issueEditValidation);

            SpreadsheetApp.flush();

            // months
            FORMSHEET.getRange(TE_issue_start_row, 3, currentIssues.length, 1)
                .setDataValidation(monthValidation);

            // value
            FORMSHEET.getRange(TE_issue_start_row, 7, currentIssues.length, 1)
                .setNumberFormat("$#,##0.00");


            SpreadsheetApp.flush();

            FORMSHEET.getRange(TE_issue_start_row, 5, currentIssues.length, 1)
                .setDataValidation(conditionsRule);

        }
        else {
            FORMSHEET.getRange(TE_issue_start_row, 1, 2, 9)
                .setBackground('#f3f3f3')
                .setFontFamily('Arial')
                .setFontSize(10);
        }

        rebuildFunctionsDropdown("edit");

        display.setValue ("Done!");

        return true;
    } 
    catch (error) {
        display.setValue ("Problem showing issues: " + error);
        return false;
    }

}