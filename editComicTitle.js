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

            let startRow = TE_issue_start_row;

            for (let i=0; i<issues.length; i++) {
                let myIssue = issues[i];

                let rowData = [
                    "", 
                    myIssue.number, 
                    myIssue.month,
                    myIssue.year,
                    myIssue.grade,
                    "",
                    myIssue.online,
                    myIssue.overstreet
                ];
                FORMSHEET.getRange(startRow, 1, 1, rowData.length).setValues([rowData])
                    .setFontColor("black")
                    .setFontSize(10)
                    .setHorizontalAlignment("left");

                FORMSHEET.insertRowAfter(startRow++)

            }

        }


        return true;
    } catch (error) {
        display.setValue ("Error getting title edit: " + error);
        return false;
    }
}