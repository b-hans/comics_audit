class ComicPublisher {
    constructor (params) {
        let id = -1;
        this.valid = true;
        const display = FORMSHEET.getRange(DISPLAYCELL);

        try {

            if (params.id) {
                id = params.id;
            }

            if (id < 0) {
                this.valid = false;
                return;
            }

            const publisherData = SpreadsheetApp.getActiveSpreadsheet()
                .getSheetByName("Publishers ID")
                .getDataRange()
                .getValues();

            const HEADERS = publisherData.shift();

            let filteredResults = [];

            filteredResults = publisherData.filter (
                item => item[HEADERS.indexOf("id")] === id
            );

            if (filteredResults.length != 1){
                this.valid = false;
                return;
            }

            this.name = filteredResults[0][HEADERS.indexOf("Publisher")];
            this.id = id;

            return;
        } catch (error) {

            display.setValue ("Error getting publisher: " + error);
            this.valid = false;
            return;

        }




    }
}