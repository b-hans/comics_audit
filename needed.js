function needed (params) {

    const display = params.display;
    const cache = params.cache;
    const type = params.type;

    try {

        // get and cache current issues
        display.setValue ("Working....");

        const title_id = FORMSHEET.getRange(TE_ID_RANGE).getValue();
        const first = FORMSHEET.getRange(TE_FIRST_RANGE).getValue();
        const last = FORMSHEET.getRange(TE_LAST_RANGE).getValue();

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


        if (type == "show") {
            let start = TE_issue_start_row;
            let end = FORMSHEET.getLastRow();
            let numRows = end - start + 1;

            let issuesData = [];

            if (numRows > 0) {
                let issuesRange = FORMSHEET.getRange(start, 1, numRows, FORMSHEET.getLastColumn());
                issuesData = issuesRange.getValues();

                issuesRange.clearContent();
                issuesRange.clearDataValidations(); 

            }

            cache.put('issuesData', JSON.stringify(issuesData), 3600);
            cache.put('needType', "show", 3600);

            let neededIssues = [];

            for (let i=first; i<last+1; i++) {
                if (issuesData.some(row => row[1] == i)) {
                    console.log ("issue: " + i);
                    continue;
                }

                neededIssues.push (["", i, "", "", "", "", "", "", ""]);
            }

            console.log (neededIssues);

            if (neededIssues.length > 0) {
                const neededRange = FORMSHEET.getRange(TE_issue_start_row, 1, neededIssues.length, 9);
                const numRange = FORMSHEET.getRange(TE_issue_start_row, 2, neededIssues.length);

                neededRange.setValues(neededIssues)
                    .setFontColor("black")
                    .setFontSize(10)
                    .setVerticalAlignment("top")
                    .setBackground("#f3f3f3")
                    .setHorizontalAlignment("left");

                numRange.setHorizontalAlignment("center");

            }      
            
            rebuildFunctionsDropdown("showNeeded");

            display.setValue ("Done!");
        }
        else if (type == "hide") {
            // get range
            let delStart = TE_issue_start_row;
            let delEnd = FORMSHEET.getLastRow();
            let delNumRows = delEnd - delStart + 1;

            FORMSHEET.deleteRows(delStart, delNumRows);

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

                const conditions = getConditions();

                const conditionsRule = SpreadsheetApp.newDataValidation()
                    .requireValueInList(conditions.dropdown, true)
                    .setAllowInvalid(false)
                    .build();

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
        }

        return true;
    } catch (error) {
        display.setValue ("Error getting needed: " + error);
        return false;
    }

}