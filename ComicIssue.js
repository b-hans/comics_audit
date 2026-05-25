class ComicIssue {
    constructor (params) {
        this.valid = true;
        let id = -1;
        const row = params.row
        const headers = params.headers
        const display = FORMSHEET.getRange(DISPLAYCELL);

        try {
            id = row[headers.indexOf('id')];

            if (id < 0) {
                this.valid = false;
                return;
            }

            this.number = row[headers.indexOf("Number")];
            this.month = row[headers.indexOf("month")];
            this.year = row[headers.indexOf("year")];
            this.online = row[headers.indexOf("Value Online")];
            this.overstreet = row[headers.indexOf("Value Overstreet")];

            // this.grade = "F";


            this.grade = GRADINGDATA.filter (
                item => item[GRADINGHEADERS.indexOf('id')] === 
                row[headers.indexOf("condition_id")]
            )[0][GRADINGHEADERS.indexOf('Condition')];

            return;
        } catch (error) {
            display.setValue ("Error getting issues: " + error);
            this.valid = false;
            return;
        }

    }
}