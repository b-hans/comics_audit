function editPublisher (params) {
    const display = params.display;
    const cache = params.cache;

    try {

        const publisher_edit = JSON.parse(cache.get('publisher_edit'));
        const currentPublisher = new ComicPublisher ({id: null, publisher: publisher_edit.dropdown});

        const pubData = getPublisherData();

        let data = pubData.data;
        let headers = pubData.headers;

        let rowNumber = data.findIndex(row => row[headers.indexOf('id')] == currentPublisher.id) + 2;

        let sheet = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName('Publishers ID');

        let changeRange = sheet.getRange(rowNumber, 1, 1, headers.length)
            .setValues([[currentPublisher.id, publisher_edit.publisher]]);

        // clear data

        rebuildPublishersDropdown({
            type:       'PUB',
            display:    display,
            range:      FORMSHEET.getRange(PUB_PUBLISHERS_DROPDOWN_RANGE)
        });

        FORMSHEET.getRange(PUB_SEARCH_RANGE).setValue(publisher_edit.publisher);
        FORMSHEET.getRange(PUB_PUBLISHERS_DROPDOWN_RANGE).setValue(publisher_edit.publisher)
            .activate();

        clearCache();

        display.setValue ("Publisher updated!");
        
        return true;
    } catch (error) {
        display.setValue ("Error editing publisher: " + error);
        return false;
    }
}