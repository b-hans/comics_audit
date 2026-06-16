function getIssueStatus (params) {
    const issue = params.issue;
    const display = params.display;
    const headers = params.headers;
    const titleIssues = params.titleIssues;
    const issuesHeaders = params.issuesHeaders;
    const allConditionData = params.allConditionData;
    const conditionData = allConditionData.data;
    const conditionHeaders = allConditionData.headers;

    try {
        let returnInfo = {
            valid:          true,
            change:         false,
            errors:         [],
            condition_id:   null,
        };

        const issue_id = issue[headers.indexOf('id')];
        const currentIssue = titleIssues.find(row => 
            row[issuesHeaders.indexOf('id')] == issue_id);

        // check for changes
        for (let i=1; i<headers.length-1; i++) {
            
            switch (headers[i]) {
                case "Number":
                    if (currentIssue[issuesHeaders.indexOf('Number')] != issue[i]) {
                        returnInfo.change = true;
                    }

                    if (!isNumeric(issue[i])) {
                        returnInfo.valid = false;
                        returnInfo.errors.push (issue[i] + " is not numeric");
                    }

                    break;
                case "Month":
                    if (currentIssue[issuesHeaders.indexOf('month')] != issue[i]) {
                        returnInfo.change = true;
                    }
                    break;
                case "Year":
                    if (currentIssue[issuesHeaders.indexOf('year')] != issue[i]) {
                        returnInfo.change = true;
                    }
                    break;
                case "Condition":
                    if (!issue[i] || issue[i] == "Select one") {
                        returnInfo.valid = false;
                        returnInfo.errors.push(issue[headers.indexOf('Number')] + " condition req.");
                        break;
                    }

                    const newConditionId = conditionData.find(row => 
                        row[conditionHeaders.indexOf('Condition')] == issue[i]);

                    returnInfo.condition_id = newConditionId[conditionHeaders.indexOf('id')];

                    if (currentIssue[issuesHeaders.indexOf('condition_id')] != 
                        newConditionId[conditionHeaders.indexOf('id')]) {
                        returnInfo.change = true;
                    }

                    break;
                case "Location":
                    if (currentIssue[issuesHeaders.indexOf("Box Number")] != issue[i]) {
                        returnInfo.change = true;
                    }
                    break;
                case "Online":
                    if (currentIssue[issuesHeaders.indexOf('Value Online')] != issue[i]) {
                        returnInfo.change = true;
                    }

                    if (issue[i] && !isNumeric(issue[i])) {
                        returnInfo.valid = false;
                        returnInfo.errors.push(issue[headers.indexOf('Number')] + " online invalid");
                    }
                    
                    break;

                case "Notes":
                    if (currentIssue[issuesHeaders.indexOf('Notes')] != issue[i]) {
                        returnInfo.change = true;
                    }
                    break;

            }
        }


        return returnInfo;
    } catch (error) {
        display.setValue ("Error validating an issue: " + error);
        returnInfo.valid = false;
        return returnInfo;
    }

}
    