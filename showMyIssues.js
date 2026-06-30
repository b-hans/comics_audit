function showMyIssues (params) {
    
    const display = params.display;
    const cache = params.cache;

    try {

        // get range
        let delStart = TE_issue_start_row;
        let delEnd = FORMSHEET.getLastRow();
        let delNumRows = delEnd - delStart + 1;

        if (delNumRows > 0) {
            FORMSHEET.deleteRows(delStart, delNumRows);
        }

        let currentIssues = JSON.parse(cache.get("issuesData"));

        if (currentIssues.length > 0) {

            const currentRange = FORMSHEET.getRange(
                TE_issue_start_row, 1, currentIssues.length, currentIssues[0].length);

            if (!styleIssuesRange({
                display:    display,
                range:      currentRange,
                data:       currentIssues,
                type:       "myIssues",
            })) {
                display.setValue ("Problem styling range");
                return false;
            }

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