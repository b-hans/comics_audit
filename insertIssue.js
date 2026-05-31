function insertIssue () {

    FORMSHEET.getRange(TE_issue_start_row, 1, 1, 1).setValue("Options");

    try {
        const sheet = FORMSHEET;
        const title_id = sheet.getRange(TE_ID_RANGE).getValue();
        const myTitle = new ComicTitle ({
            id: title_id,
            title: null
        });

        const issue_id = getNextIssueId();

        ui.alert("Title: " + myTitle.title + "\n" +
            "Publisher: " + myTitle.publisher.name + " : " + myTitle.publisher.id
        );

    } catch (error) {
        ui.alert("Error: " + error);
        return false;
    }

    return true;

}