function addPublisher (params) {

    const display = params.display;
    const cache = params.cache;

    try {

        const pubData = getPublisherData();

        const headers = pubData.headers;
        let data = pubData.data;

        let sheet = SpreadsheetApp.getActiveSpreadsheet()
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

        let newPubList = data.map(row => row[headers.indexOf('Publisher')]);
        newPubList.unshift("Select a publisher");

        data.unshift(headers);

        sheet.clearContents();

        sheet.getRange (1, 1, data.length, data[0].length)
            .setValues(data);

        FORMSHEET.getRange(PUB_SEARCH_RANGE).setValue("");
        clearCache();

        let dropdownRange = FORMSHEET.getRange(PUB_PUBLISHERS_DROPDOWN_RANGE)
            .clearDataValidations()
            .clearContent();

        const newPublisherRule = SpreadsheetApp.newDataValidation()
            .requireValueInList(newPubList, true)
            .setAllowInvalid(false)
            .build();

        SpreadsheetApp.flush();

        dropdownRange.setDataValidation(newPublisherRule)
            .setValue(newPubList[0]);

        display.setValue ("Publisher added!");
        return true;

    } catch (error) {
        display.setValue("Error adding publisher: " + error);
        return false;
    }
}