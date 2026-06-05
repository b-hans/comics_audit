function getPublisherData () {

    try {

        const publisherData = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName("Publishers ID")
            .getDataRange()
            .getValues();
        const publisherHeaders = publisherData.shift();

        const dropdown = publisherData.map (row => 
            row[publisherHeaders.indexOf('Publisher')] + " (" + 
            row[publisherHeaders.indexOf('id')] + ")"
        );

        return {
            data:       publisherData,
            headers:    publisherHeaders,
            dropdown:   dropdown,
            valid:      true
        }
    } catch (error) {
        ui.alert ("Error: " + error);
        return { valid: false }
    }

}