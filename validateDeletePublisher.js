function validateDeletePublisher (params) {
    const display = params.display;
    const cache = params.cache;
    const publisher = FORMSHEET.getRange(PUB_SEARCH_RANGE).getValue();

    try {
        display.setValue("Working....");

        let myPublisher = new ComicPublisher({id: null, publisher: publisher});
        if (!myPublisher.valid) {
            display.setValue ("Error getting publisher");
            return false;
        }

        cache.put("delete_publisher", JSON.stringify(myPublisher), 3600);

        let titleData = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName('Title table')
            .getDataRange()
            .getValues();
        let headers = titleData.shift();

        let titleFilter = titleData.filter(row => 
            row[headers.indexOf('publisher_id')] == myPublisher.id);

        if (titleFilter.length > 0) {
            let errorReturn = "Delete titles first\n";

            for (let i=0; i<titleFilter.length; i++) {
                let item = titleFilter[i];
                errorReturn += item[headers.indexOf('Title')];
                if (item[headers.indexOf('Volume')]) {
                    errorReturn += ' vol.' + item[headers.indexOf('Volume')];
                }
                errorReturn += "\n";
            }

            display.setValue (errorReturn);
            return false;
        }

        return true;
        
    } catch (error) {
        display.setValue ("Error trying to validate publisher delete: " + error);
        return false;
    }

}