class ComicIssue {
    constructor (params) {
        this.valid = true;
        let id = params.id;
        let row = params.row;
        let headers = params.headers;
        let display = params.display;

        if (!display) {
            display = FORMSHEET.getRange(DISPLAYCELL);
        }

        try {

            // by issue id
            if (id != -1) {
                const issueData = SpreadsheetApp.getActiveSpreadsheet()
                    .getSheetByName("MyComics")
                    .getDataRange()
                    .getValues();
                headers = issueData.shift();

                let rowIndex = issueData.findIndex(row => row[headers.indexOf('id')] == id);

                row = issueData[rowIndex]

            }
            // by row input
            else {
                id = row[headers.indexOf('id')];
            }

            if (id < 0) {
                // this.valid = false;
                // return;
                this.id = null;
            }
            else {
                this.id = id;
            }

            this.number = row[headers.indexOf("Number")];
            this.month = row[headers.indexOf("month")];
            this.year = row[headers.indexOf("year")];
            this.online = row[headers.indexOf("Value Online")];
            this.notes = row[headers.indexOf("Notes")];
            this.location = row[headers.indexOf("Box Number")];

            if (this.id) {
                this.grade = GRADINGDATA.filter (
                    item => item[GRADINGHEADERS.indexOf('id')] === 
                    row[headers.indexOf("condition_id")]
                )[0][GRADINGHEADERS.indexOf('Condition')];
            }
            else {
                this.grade = null;
            }

            return;
        } catch (error) {
            display.setValue ("Error getting issues: " + error);
            this.valid = false;
            return;
        }

    }
}