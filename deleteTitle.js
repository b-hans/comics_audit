function deleteTitle(params) {

    const display = params.display;
    const cache = params.cache;

    try {
        const title_id = cache.get("current_title_id");
        display.setValue ("Working....");

        const issuesSheet = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName("MyComics");

        const issueData = issuesSheet.getDataRange().getValues();
        const headers = issueData.shift();

        const title_id_column = headers.indexOf("title_id");

        // delete the issues
        if (issueData.length > 0 ) {

            const filteredIssues = issueData.filter(row => {
                return row[title_id_column] != title_id;
            });

            filteredIssues.unshift(headers);

            issuesSheet.clearContents();
            issuesSheet.getRange(1, 1, filteredIssues.length, filteredIssues[0].length)
                .setValues(filteredIssues);

            display.setValue(display.getValue() + "\nissues deleted");

        }

        // now delete the title

        const titleSheet = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName('Title table');
        const titleData = titleSheet.getDataRange().getValues();
        const titleHeaders = titleData.shift();

        const deleteIndex = titleData.findIndex(
            row => row[titleHeaders.indexOf('id')] == title_id) + 2;

        titleSheet.deleteRow(deleteIndex);
        
        clearCache();
        
        if (rebuildTitleSearchForm()) {

            FORMSHEET.getRange(TS_DISPLAY_RANGE).setValue ("Title deleted!");
            return true;

        }
        else {
            return false;
        }

    } catch (error) {
        display.setValue("Error deleting title: " + error);
        return false;
    }
}