function updateAllIssues(params) {
    const display = params.display;
    const cache = params.cache;

    try {

        const changes = JSON.parse(cache.get('validate_status')).changes;

        const issuesSheet = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName("MyComics");

        // data to update
        const issuesData = issuesSheet.getDataRange().getValues();
        const issuesHeaders = issuesData.shift();

        const newIssueHeaders = FORMSHEET.getRange(TE_issue_start_row-1, 1, 1, FORMSHEET.getLastColumn())
            .getValues()[0];

        display.setValue ("ids to change: " + changes.length + "\n");
        for (let i=0; i<changes.length; i++) {
            let findIndex = issuesData.findIndex(
                row => row[issuesHeaders.indexOf('id')] == changes[i][newIssueHeaders.indexOf('id')]);

            let issueRow = issuesData[findIndex];
            let changeRow = changes[i];

            for (let i=1; i<newIssueHeaders.length-1; i++) {
                switch (newIssueHeaders[i]) {
                    case "Number":
                        issueRow[issuesHeaders.indexOf('Number')] = changeRow[i];
                        break;
                    case "Month":
                        issueRow[issuesHeaders.indexOf('month')] = changeRow[i];
                        break;
                    case "Year":
                        issueRow[issuesHeaders.indexOf('year')] = changeRow[i];
                        break;
                    case "Condition":
                        issueRow[issuesHeaders.indexOf('condition_id')] = changeRow[i];
                        break;
                    case "Location":
                        issueRow[issuesHeaders.indexOf('Box Number')] = changeRow[i];
                        break;
                    case "Online":
                        issueRow[issuesHeaders.indexOf('Value Online')] = changeRow[i];
                        break;
                    case "Overstreet":
                        issueRow[issuesHeaders.indexOf('Value Overstreet')] = changeRow[i];
                        break;
                }
            }

        }

        display.setValue ("Next 812");

        console.log ("test1", changes, issuesHeaders, newIssueHeaders);

        FORMSHEET.getRange(TE_FUNCTIONS_RANGE).activate();

        return true;
    } catch (error) {
        display.setValue ("Error updating all issues: " + error);
        return false;
    }
}