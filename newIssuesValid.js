function newIssuesValid (params) {

    const display = params.display;
    const cache = params.cache;

    const headers = {
        Number:     1,
        Month:      2,
        Year:       3,
        Condition:  4,
        Location:   5,
        Online:     6,
        Notes:      7,
        id:         8,
    }

    try {

        display.setValue("Validating....");

        // get the title information
        const title_id = FORMSHEET.getRange(TE_ID_RANGE).getValue();
        const publisher = FORMSHEET.getRange(TE_PUBLISHER_DROPDOWN_RANGE).getValue();
        const publisher_id = getPublisherFromDropdown({display: display, publisher: publisher});

        // get the current range
        const start = TE_issue_start_row;
        const end = FORMSHEET.getLastRow();
        const numRows = end - start + 1;
        const numCols = FORMSHEET.getLastColumn();

        const newIssuesRange = FORMSHEET.getRange(start, 1, numRows, numCols);

        // filter out the new issues to enter
        let data = newIssuesRange.getValues().filter (
            row => {
                if (
                    row[headers.Year] ||
                    row[headers.Condition] ||
                    row[headers.Location] ||
                    row[headers.Online] ||
                    row[headers.Notes] ||
                    (row[headers.Month] && row[headers.Month] != "Select one")
                ){
                    return true;
                }
                else {
                    return false;
                }
            }
        );

        // no changes return a message
        if (data.length < 1) {
            display.setValue ("No changes to add");
            return false;
        }

        let errorList = "";

        // validate the new entries
        for (let i=0; i<data.length; i++) {
            if (!data[i][headers.Condition]) {
                errorList += "Condition required: #" + data[i][1] + "\n";
            }
            if (isNotValidCurrency(usdFormatter.format(data[i][headers.Online]))) {
                errorList += "Not valid currency: " + data[i][headers.Number];
            }
        }

        // validation errors, return the message
        if (errorList) {
            display.setValue(errorList);
            return false;
        }

        let newIssues = {
            title_id:       title_id,
            publisher_id:   publisher_id,
            issues:         data,
        }

        cache.put("newIssues", JSON.stringify(newIssues), 3600);

        display.setValue("Valid");

        return true;
    }
    catch (error) {
        display.setValue ("Error validating new issues: " + error);
        false;
    }
}