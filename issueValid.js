function issueValid (params) {

    /*
        cache
        display
        options cell
        options text

    */

    const cache = params.cache;
    const display = params.display;
    const optionsColumn = params.optionsColumn;
    const optionsRow = params.optionsRow;
    const optionsText = params.optionsText;

    const sheet = FORMSHEET;

    try {

        const data = sheet.getRange(optionsRow, 1, 1, TE_ISSUE_ID_COLUMN+1)
            .getValues()[0];

        const issue = new ComicIssue({
            row:        null,
            headers:    null,
            id:         data[TE_ISSUE_ID_COLUMN]
        });

        sheet.getRange(optionsRow, optionsColumn, 1, 1)
            .setValue(optionsText);

        // checks here
        let valid = true;
        let change = false;

        let errorDisplay = "Errors\n";

        let headers = [
            'Options', 
            "number",
            "month",
            "year",
            "condition",
            "location",
            "online",
            "overstreet",
        ];
        
        let testVal = "";

        for (let i=1; i<headers.length; i++){
            let item = data[i];
            let head = headers[i];

            switch (head) {
                case "number":
                    if (!item) {
                        change = true;
                        valid = false;
                        errorDisplay += "Number is required\n";
                    }
                    else if (item != issue.number){
                        change = true;
                    }

                    break;

                case "month":
                    if (item != issue.month) {
                        change = true;
                    }
                    break;

                case "year":
                    if (item != issue.year) {
                        change = true;
                    }
                    break;

                case "condition":
                    if (!item || item == "Select one") {
                        errorDisplay += "Condition is required\n";
                        change = true;
                        valid = false;
                    }
                    else if (item != issue.grade) {
                        change = true;
                    }
                    break;

                case "location":
                    if (item != issue.location) {
                        change = true;
                    }
                    break;

                case "online":
                    if (item != issue.online) {
                        change = true;
                    }
                    // check for valid dollar amount
                    testVal = parseFloat(item);
                    if (item && Number.isNaN(testVal)) {
                        errorDisplay += "Online: not a valid number\n"
                        valid = false;
                    }
                    break;

                case "overstreet":
                    if (item != issue.overstreet) {
                        change = true;                        
                    }
                    testVal = parseFloat(item);
                    if (item && Number.isNaN(testVal)) {
                        errorDisplay += "Overstreet: not a valid number\n"
                        valid = false;
                    }
                    break;

                default:
                    break;

            }
        }

        if (!change) {
            errorDisplay += "No changes have been made";

            display.setValue (errorDisplay);
            return false;
        }
        else if (!valid) {
            display.setValue (errorDisplay);
            return false;
        }

        return true;
    } catch (error) {
        display.setValue ("Error validating issue: " + error);
        return false;
    }
}