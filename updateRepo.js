function updateRepo (params) {

    const display = params.display;
    const repo_id = "1_t6_XAepG4eiC1K4l6QMbeW9g_fqJUQTAXXIJWElvOg";

    try {

        display.setValue ("Working....");

        const repoSpreadsheet = SpreadsheetApp.openById(repo_id);

        const sheetIssues = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName("MyComics");

        const dataIssues = sheetIssues.getDataRange().getValues();

        const sheetTitles = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName("Title table");

        const dataTitles = sheetTitles.getDataRange().getValues();

        const sheetPublishers = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName("Publishers ID");

        const dataPublishers = sheetPublishers.getDataRange().getValues();

        const repoIssues = repoSpreadsheet.getSheetByName("MyComics");
        const repoTitles = repoSpreadsheet.getSheetByName("Title table");
        const repoPublishers = repoSpreadsheet.getSheetByName("Publishers ID");

        //publishers first

        display.setValue (display.getValue() + "\nUpdating publishers....");

        repoPublishers.clearContents();
        
        const pubRange = repoPublishers.getRange(1, 1, dataPublishers.length, dataPublishers[0].length)
            .setValues(dataPublishers);

        display.setValue (display.getValue() + "\nUpdating titles....");
        repoTitles.clearContents();

        const titleRange = repoTitles.getRange (1, 1, dataTitles.length, dataTitles[0].length)
            .setValues(dataTitles);

        display.setValue (display.getValue() + "\nUpdating issues....");

        repoIssues.clearContents();

        const issueRange = repoIssues.getRange (1, 1, dataIssues.length, dataIssues[0].length)
            .setValues(dataIssues);


        display.setValue ("Done!");

        return true;

    } catch (error) {
        display.setValue ("Error updating repo: " + error);
        return false;
    }
}