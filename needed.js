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

        if (type == "show") {
            let start = TE_issue_start_row;
            let end = FORMSHEET.getLastRow();
            let numRows = end - start + 1;

            let issuesRange = FORMSHEET.getRange(start, 1, numRows, FORMSHEET.getLastColumn());
            let issuesData = issuesRange.getValues();
            cache.put('issuesData', JSON.stringify(issuesData), 3600);

            issuesRange.clearContent();
            issuesRange.clearDataValidations(); 

            let neededIssues = [];
            let neededRow = ["", "", "", "", "", "", "", "", ""];

            for (let i=first; i<last+1; i++) {
                if (issuesData.some(row => row[1] == i)) {
                    console.log ("issue: " + i);
                    continue;
                }

                neededIssues.push (["", i, "", "", "", "", "", "", ""]);
            }

            console.log (neededIssues);

            if (neededIssues.length > 0) {
                const neededRange = FORMSHEET.getRange(TE_issue_start_row, 1, neededIssues.length, 9)
                    .setValues(neededIssues);
            }
                    

            display.setValue ("Done!");
        }
        else if (type == "hide") {
            // do something
        }

        return true;
    } catch (error) {
        display.setValue ("Error getting needed: " + error);
        return false;
    }

}