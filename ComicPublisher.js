class ComicPublisher {
    constructor (params) {

        this.valid = true;
        const id = params.id;
        const publisher = params.publisher;

        try {

            if (publisher) {
                this.name = publisher;
            }
            else if (id < 1) {
                this.valid = false;
                return;
            }
            else {
                this.id = id;
            }

            const publisherData = SpreadsheetApp.getActiveSpreadsheet()
                .getSheetByName("Publishers ID")
                .getDataRange()
                .getValues();

            const HEADERS = publisherData.shift();

            let foundRow;

            if (this.id) {
                foundRow = publisherData.find(row => row[HEADERS.indexOf('id')] == this.id);
                this.name = foundRow[HEADERS.indexOf('Publisher')];
            }
            else if (this.name) {
                foundRow = publisherData.find(row => row[HEADERS.indexOf('Publisher')] == this.name);
                this.id = foundRow[HEADERS.indexOf('id')];
            }

            if (!this.id || this.id < 1 || !this.name) {
                this.valid = false;
                return;
            }

            return;
        } catch (error) {
            this.valid = false;
            return;
        }

    }
}