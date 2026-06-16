function newIssueValid (params) {
    const display = params.display;
    const options = params.options;
    const text = params.text;

    options.setValue(text);

    try {

        const rowData = FORMSHEET.getRange(TE_issue_start_row, 1, 1, 8)
            .getValues()
            .flat();

        // get the values 
        const newIssue = {
            number:     String(rowData[1]),
            month:      rowData[2],
            year:       rowData[3],
            condition:  rowData[4],
            location:   rowData[5],
            online:     rowData[6],
            notes:      rowData[7]
        }

        let errors = "Required:\n";
        let valid = true;

        if (!newIssue.number) {
            valid = false;
            errors += "Number, ";
        }

        if (!isNumeric(newIssue.number)) {
            valid = false;
            errors += "Issue number not valid, ";
        }

        if (!newIssue.condition || newIssue.condition == "Select one") {
            valid = false;
            errors += "Condition, ";
        }

        if (!valid) {
            display.setValue (errors.slice(0, -2));
            return false;
        }

        return true;
    } catch (error) {
        display.setValue ("Error: " + error);
        return false;
    }

}