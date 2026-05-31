function insertIssue () {

    FORMSHEET.getRange(TE_issue_start_row, 1, 1, 1).setValue("Options");

    try {

        const sheet = FORMSHEET;
        const display = sheet.getRange(TE_DISPLAY);
        const title_id = sheet.getRange(TE_ID_RANGE).getValue();

        display.setValue("Working....");

        const myTitle = new ComicTitle ({
            id: title_id,
            title: null
        });

        const newId = getNextIssueId();

        if (!newId.valid) {
            ui.alert("Problem getting a new issue id");
            return false;
        }

        const publisher_id = myTitle.publisher.id;

        const newIssueData = sheet.getRange(TE_issue_start_row, 2, 1, 7)
            .getValues()[0];

        const conditions = getConditions();

        let myCondition = newIssueData[3];
        let condition_id = null;

        // let conditionRow = 

        
        const issue = {
            id:             newId.id,
            title_id:       title_id,
            publisher_id:   publisher_id,
            number:         newIssueData[0],
            month:          newIssueData[1],
            year:           newIssueData[2],
            condition:      newIssueData[3],
            location:       newIssueData[4],
            online:         newIssueData[5],
            overstreet:     newIssueData[6]
        }

        console.log (issue);

        display.setValue ("Check console\nDone!");


    } catch (error) {
        ui.alert("Error: " + error);
        return false;
    }

    return true;

}