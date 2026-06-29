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

        const conditions = getConditions();

        const conditionsRule = SpreadsheetApp.newDataValidation()
            .requireValueInList(conditions.dropdown, true)
            .setAllowInvalid(false)
            .build();

        if (type == "show") {

            if ((first === null || first == "" && first != 0)|| !last) {
                display.setValue ("Can't show needed. First and last needed to be indicated");
                return true;
            }
            
            let start = TE_issue_start_row;
            let end = FORMSHEET.getLastRow();
            let numRows = end - start + 1;

            let issuesData = [];
            let issuesRange;

            if (numRows > 0) {
                issuesRange = FORMSHEET.getRange(start, 1, numRows, FORMSHEET.getLastColumn());
                issuesData = issuesRange.getValues();

                // issuesRange.clearContent();
                // issuesRange.clearDataValidations(); 

            }

            cache.put('issuesData', JSON.stringify(issuesData), 3600);
            cache.put('needType', "show", 3600);

            let neededIssues = [];

            for (let i=first; i<last+1; i++) {
                if (issuesData.some(row => row[1] == i)) {
                    continue;
                }

                neededIssues.push (["", i, "", "", "", "", "", "", ""]);
            }


            if (neededIssues.length > 0) {

                if (numRows > 0) {
                    issuesRange.clearContent();
                    issuesRange.clearDataValidations(); 
                }

                const neededRange = FORMSHEET.getRange(TE_issue_start_row, 1, neededIssues.length, 9);
                const numRange = FORMSHEET.getRange(TE_issue_start_row, 2, neededIssues.length);

                neededRange.setValues(neededIssues)
                    .setFontColor("black")
                    .setFontSize(10)
                    .setVerticalAlignment("top")
                    .setBackground("#f3f3f3")
                    .setHorizontalAlignment("left");

                numRange.setHorizontalAlignment("center");

                SpreadsheetApp.flush();

                FORMSHEET.getRange(TE_issue_start_row, 5, neededIssues.length, 1)
                    .setDataValidation(conditionsRule);

                SpreadsheetApp.flush();

                FORMSHEET.getRange(TE_issue_start_row, 3, neededIssues.length, 1)
                    .setDataValidation(monthValidation);

                
                rebuildFunctionsDropdown("showNeeded");
                
                display.setValue ("Done!");
            }
            else {
                display.setValue ("No issues needed for this title!");
            }


        }
        else if (type == "hide") {
            return showMyIssues({display: display, cache: cache});
        }

        return true;
    } catch (error) {
        display.setValue ("Error getting needed: " + error);
        return false;
    }

}