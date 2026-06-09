function addPublisher (params) {

    const display = params.display;
    const cache = params.cache;

    try {

        const pubData = getPublisherData();

        const headers = pubData.headers;
        let data = pubData.data;

        const sheet = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName("Publishers ID");

        const ids = sheet.getRange(2, headers.indexOf('id')+1, sheet.getLastRow()-1, 1)
            .getValues().flat();

        const nextId = Math.max(...ids) + 1;

        const newPublisher = cache.get("new_publisher");

        data.push([nextId, newPublisher]);

        let marvel = data.shift();
        let dc = data.shift();

        data.sort((a, b) => 
            a[headers.indexOf('Publisher')].localeCompare(b[headers.indexOf('Publisher')]));

        data.unshift(dc);
        data.unshift(marvel);
        data.unshift(headers);

        console.log (data);

        display.setValue ("Adding publisher 40: " + newPublisher + " : " + nextId);
        return true;

    } catch (error) {
        display.setValue("Error adding publisher: " + error);
        return false;
    }
}