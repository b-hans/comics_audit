function enterTitle (params) {

    const display = params.display;
    const cache = params.cache;

    try {

        const title = JSON.parse(cache.get('current_title'));
        const sheet = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName("Title table");

        if (!title) {
            display.setValue ("No title data");
            return false;
        }

        if (title.id == -1) {
            title.id = getNextTitleId({display: display}).id;
        }

        // construct the row
        const insertRow = [
            title.id,
            title.title,
            title.publisher_id,
            title.volume,
            title.first,
            title.last,
        ];

        sheet.appendRow(insertRow);
        if (!sortTitles({display: display})) {
            return false;
        }

        FORMSHEET.getRange(TE_ID_RANGE).setValue(title.id);

        rebuildFunctionsDropdown('edit');

        display.setValue ("New title entered!");
        FORMSHEET.getRange(TE_FUNCTIONS_RANGE).activate();
        return true;

    } catch (error) {
        display.setValue ("Error entering title: " + error);
        return false;
    }


}