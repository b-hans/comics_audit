function getTitles(params) {

    const searchTerm = params.searchTerm;
    const display = params.display;

    try {

        display.setValue ("Working....\n\n" + searchTerm);

        const ComicData = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName("Title table")
            .getDataRange()
            .getValues();
        const headers = ComicData.shift();

        const publisherIndex = headers.indexOf('publisher_id');

        const PublisherData = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName('Publishers ID')
            .getDataRange()
            .getValues();
        const publisherHeaders = PublisherData.shift();

        // display.setValue ("test3\n\n" + String(ComicData[0][1]));
        // display.setValue (display.getValue() + "\n" +
        //     String())
        // return { valid: true }

        // first filter
        const filteredResults = ComicData.filter (row => {
            if (String(row[headers.indexOf('Title')]).toLowerCase().includes(
                String(searchTerm).toLowerCase())){
                    return true;
            }
            return false;

        });

        const titleMap = filteredResults.map (row => {

            let pubRow = findIn2D({
                arr: PublisherData,
                index: publisherHeaders.indexOf('id'),
                searcher: row[publisherIndex],
            });

            let publisher = "";
            if (pubRow.match) {
                publisher = pubRow.row[publisherHeaders.indexOf('Publisher')];
            }

            let returnValue = row[headers.indexOf('Title')];
            if (row[headers.indexOf('Volume')]) {
                returnValue += ', vol.' + row[headers.indexOf('Volume')];
            }

            if (publisher) {
                returnValue += " (" + publisher + ")";
            }

            return returnValue;

        });

        if (titleMap.length <= 0) {
            return { valid: false}
        }

        if (titleMap.length > 1) {
            titleMap.unshift("Select a title");
        }

        return {
            titles: titleMap,
            valid: true
        }

    } catch (error) {
        display.setValue ("Error getting comic titles: " + error);
        return { valid: false }
    }

}