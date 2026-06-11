function validateAllIssueEdits (params) {
    const display = params.display;
    const cache = params.cache;

    try {

        display.setValue ("Working....");

        const sheet = FORMSHEET;

        const title_id = sheet.getRange(TE_ID_RANGE).getValue();
        const allIssues = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName('MyComics')
            .getDataRange()
            .getValues();
        const issuesHeaders = allIssues.shift();

        const titleIssues = allIssues.filter(row =>
            row[issuesHeaders.indexOf('title_id')] == title_id
        );

        const allConditionData = getConditions();

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

        let issuesToChange = [];

        for (let i=0; i<data.length; i++) {
            let item = data[i];
            let validStatus = getIssueStatus ({
                issue:              item, 
                display:            display, 
                headers:            headers,
                titleIssues:        titleIssues,
                issuesHeaders:      issuesHeaders,
                allConditionData:   allConditionData});

            if (!validStatus.valid) {
                valid = false;
                errors.push(validStatus.errors);
            }

            if (validStatus.change) {

                let mapped = data[i].map ((el, i) => {
                    if (i == 4) {
                        el = validStatus.condition_id;
                    }
                    return el;
                });
                issuesToChange.push(mapped);
                change = true;
            }

        }

        if (!valid) {
            let errorsOut = "Check errors";
            for (let i=0; i<errors.length; i++) {
                errorsOut += "\n" + errors[i];
            }
            display.setValue(errorsOut);
            return { valid: false }
        }

        if (!change) {
            display.setValue ("Nothing to change");
            return { valid: false}
        }

        return {
            valid:     true,
            changes:   issuesToChange
        }

        
    } catch (error) {
        display.setValue ("Error validating all issues: " + error);
        return false;
    }
}