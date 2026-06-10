function deletePublisher (params) {
    const display = params.display;
    const cache = params.cache;

    try {

        const myPublisher = JSON.parse(cache.get('delete_publisher'));
        const sheet = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName("Publishers ID");

        if (!myPublisher) {
            display.setValue("Error getting publisher from cache");
            return false;
        }

        const data = sheet.getDataRange().getValues();
        const headers = data.shift();

        // plus 2 because 0 indexing and header row gone
        const rowNumber = data.findIndex(row => row[headers.indexOf('id')] == myPublisher.id) + 2;

        sheet.deleteRow(rowNumber);
        clearCache();
        
        FORMSHEET.getRange(PUB_PUBLISHERS_DROPDOWN_RANGE)
            .setValue ("Select a publisher").activate();

        FORMSHEET.getRange(PUB_SEARCH_RANGE).setValue ("");

        display.setValue ("Publisher " + myPublisher.name + " deleted!");

        // TODO re make the dropdown
        return true;
    } catch (error) {
        display.setValue ("Error deleting publisher: " + error);
        return false;
    }
}