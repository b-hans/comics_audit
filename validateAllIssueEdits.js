function validateAllIssueEdits (params) {
    const display = params.display;
    const cache = params.cache;

    try {

        display.setValue ("Working....");

        const sheet = FORMSHEET;

        const start = TE_issue_start_row;
        const end = sheet.getLastRow() - start + 1;
        const lastColumn = sheet.getLastColumn();

        const issueRange = sheet.getRange(start, 1, end, lastColumn);
        const headers = sheet.getRange(TE_issue_start_row - 1, 1, 1, lastColumn)
            .getValues()[0];

        let data = issueRange.getValues();
        cache.put('edit_issue_data', JSON.stringify(data), 3600);

        let valid = true;
        let change = false;
        let errors = [];

        for (let i=0; i<data.length; i++) {
            let item = data[i];
            let validStatus = getIssueStatus ({issue: item, display: display, headers: headers});

            if (!validStatus.valid) {
                valid = false;
                errors.push(validStatus.errors);
            }

            if (validStatus.change) {
                change = true;
            }

        }

        if (!valid) {
            let errorsOut = "Check errors";
            for (let i=0; i<errors[0].length; i++) {
                errorsOut += "\n" + errors[0][i];
            }
            display.setValue(errorsOut);
            return false;
        }

        if (!change) {
            display.setValue ("Nothing to change");
            return false;
        }

        // display.setValue (display.getValue() + "\n" +
        //     "validating now11\nRange: " + TE_issue_start_row + " : " + sheet.getLastRow());

        return false;
    } catch (error) {
        display.setValue ("Error validating all issues: " + error);
        return false;
    }
}