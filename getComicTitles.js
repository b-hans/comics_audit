function getComicTitles() {

    const display = FORMSHEET.getRange(TS_DISPLAY_RANGE);

    try {

        display.setValue ("Working....");

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


        const titleMap = ComicData.map (row => {
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

            // return {
            //     id: row[headers.indexOf('id')],
            //     title: row[headers.indexOf('Title')],
            //     volume: row[headers.indexOf('Volume')],
            //     publisher: publisher
            // };
        });

        return {
            titles: titleMap,
            valid: true
        }

    } catch (error) {
        display.setValue ("Error getting comic titles: " + error);
        return { valid: false }
    }

}