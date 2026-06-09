function validateDeletePublisher (params) {
    const display = params.display;
    const cache = params.cache;
    const publisher = FORMSHEET.getRange(PUB_SEARCH_RANGE).getValue();

    try {
        display.setValue("Working....");

        cache.put("delete_publisher", publisher, 3600);

        let titleData = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName('Title table')
            .getDataRange()
            .getValues();
        let headers = titleData.shift();

        display.setValue ("In validate");
        return false;
    } catch (error) {
        display.setValue ("Error trying to validate publisher delete: " + error);
        return false;
    }

}