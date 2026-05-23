class ComicTitle {
    constructor (title) {
        this.title = title;
        let display = FORMSHEET.getRange(DISPLAYCELL);

        const TITLEDATA = SpreadsheetApp
            .getActiveSpreadsheet()
            .getSheetByName("Title table")
            .getDataRange()
            .getValues();

        const HEADERS = TITLEDATA.shift();

        try {

            let titleIndex = HEADERS.indexOf("Title");

            let filteredResult = TITLEDATA.filter (item => {
                if (String(item[titleIndex]).toLowerCase() === title.toLowerCase()) {
                    return true;
                }
                else {
                    return false;
                }
            });

            if (filteredResult.length === 0) {
                display.setValue (title + " not found");
                return false;
            }
            else if (filteredResult.length > 1) {
                display.setValue ("More than one found");
                return false;
            }

            display.setValue("check: " + filteredResult[0][1]);
            
            return true;
        } catch (error) {
            display.setValue ("Error: " + error);
            return false;
        }
    }
}