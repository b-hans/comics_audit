function existsTitle (params) {
    const display = params.display;
    const title = params.title;

    try {

        const newTitle = String(title.title).toLowerCase();
        const publisher_id = title.publisher_id;
        const volume = title.volume;

        const titleData = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName("Title table")
            .getDataRange()
            .getValues();
        const headers = titleData.shift();

        for (let i=0; i<titleData.length; i++) {
            let item = titleData[i];

            let itemTitle = String(item[headers.indexOf('Title')]).toLowerCase();

            if (itemTitle == newTitle && 
                publisher_id == item[headers.indexOf('publisher_id')] &&
                volume == item[headers.indexOf('Volume')]) {
                return true;
            }
        }

        return false;

    } catch (error) {
        display.setValue ("Error: " + error);
        return true;
    }
}