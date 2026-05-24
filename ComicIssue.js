class ComicIssue {
    constructor (params) {
        this.valid = true;
        let id = -1;
        const row = params.row
        const headers = params.headers
        const display = FORMSHEET.getRange(DISPLAYCELL);

        try {
            id = row.indexOf("id");

            if (id < 0) {
                this.valid = false;
                return;
            }

            this.number = row[headers.indexOf("Number")];
            this.month = row[headers.indexOf("month")];
            this.year = row[headers.indexOf("year")];

            return;
        } catch (error) {
            display.setValue ("Error getting issues: " + error);
            this.valid = false;
            return;
        }

    }
}