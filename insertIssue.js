function insertIssue () {

    FORMSHEET.getRange(TE_issue_start_row, 1, 1, 1).setValue("Options");
    clearSelect("TE");

    try {

        const sheet = FORMSHEET;
        const display = sheet.getRange(TE_DISPLAY);
        const title_id = sheet.getRange(TE_ID_RANGE).getValue();

        display.setValue("Working....");

        const myTitle = new ComicTitle ({
            id: title_id,
            title: null
        });

        const newId = getNextIssueId({display: display});

        if (!newId.valid) {
            display.setValue("Problem getting a new issue id");
            return false;
        }

        const publisher_id = myTitle.publisher.id;

        const newIssueData = sheet.getRange(TE_issue_start_row, 2, 1, 7)
            .getValues()[0];

        const conditions = getConditions();

        let myCondition = newIssueData[3];

        let conditionRow = conditions.data.find ( row => 
            row[conditions.headers.indexOf('Condition')] == myCondition);

        let condition_id = conditionRow[conditions.headers.indexOf('id')];
        const comicsIssuesSheet = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName("MyComics");
        
        const comicsHeaders = comicsIssuesSheet
            .getRange(1, 1, 1, comicsIssuesSheet.getLastColumn())
            .getValues()[0];

        let issueRow = [];

        const issue = {
            id:             newId.id,
            title_id:       title_id,
            publisher_id:   publisher_id,
            Number:         newIssueData[0],
            month:          newIssueData[1],
            year:           newIssueData[2],
            condition:      newIssueData[3],
            location:       newIssueData[4],
            online:         newIssueData[5],
            overstreet:     newIssueData[6],
            condition_id:   condition_id,
            Notes:          ""
        }

        for (let i=0; i<comicsHeaders.length; i++) {
            let head = comicsHeaders[i];

            switch (head) {

                case "Box Number":
                    issueRow.push(issue.location);
                    break;

                case "Value Online":
                    issueRow.push(issue.online);
                    break;

                case "Value Overstreet":
                    issueRow.push(issue.overstreet);
                    break;

                default:
                    issueRow.push(issue[head]);
                    break;
            }

        }

        // edit Comic title params display and like row edit

        comicsIssuesSheet.appendRow(issueRow);

        editComicTitle({
            title:      myTitle.edit_dropdown,
            display:    display
        });

        rebuildFunctionsDropdown('edit');

        display.setValue ("Done!");

        return true;
        
    } catch (error) {
        display.setValue("Error: " + error);
        return false;
    }

    

}