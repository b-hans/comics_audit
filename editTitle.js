function editTitle (params) {

    const cache = params.cache;
    const display = params.display;

    try {

        const title = JSON.parse(cache.get('current_title_edit'));

        const titleSheet = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName("Title table");

        const comicData = titleSheet
            .getDataRange()
            .getValues();
        const headers = comicData.shift();

        const titleRow = comicData.findIndex(
            row => row[headers.indexOf('id')] == title.id
        ) + 2;

        if (titleRow > 1) {
            titleSheet.getRange(titleRow, 1, 1, titleSheet.getLastColumn())
                .setValues([[
                    title.id,
                    title.title,
                    title.publisher_id,
                    title.volume,
                    title.first,
                    title.last
                ]]);

            cache.remove('current_title_edit');

            display.setValue ("Edits done!")
                .activate();
            
        }
        else {
            display.setValue ("Error finding row of the title");
            return false;
        }
        
        return true;
    } catch (error) {
        display.setValue ("Error editing title: " + error);
        return false;
    }

}