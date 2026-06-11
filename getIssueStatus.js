function getIssueStatus (params) {
    const issue = params.issue;
    const display = params.display;
    const headers = params.headers;

    try {
        let returnInfo = {
            valid:  true,
            change: false,
            errors: [],
        };

        const issue_id = issue[headers.indexOf('id')];
        const currentIssue = new ComicIssue({id: issue_id, display: display});

        // check for changes
        for (let i=1; i<headers.length-1; i++) {
            
            switch (headers[i]) {
                case "Number":
                    if (currentIssue.number != issue[i]) {
                        returnInfo.change = true;
                    }

                    if (!isNumeric(issue[i])) {
                        returnInfo.valid = false;
                        returnInfo.errors.push (issue[i] + " is not numeric");
                    }

                    break;
                case "Month":
                    if (currentIssue.month != issue[i]) {
                        returnInfo.change = true;
                    }
                    break;
                case "Year":
                    if (currentIssue.year != issue[i]) {
                        returnInfo.change = true;
                    }
                    break;
                case "Condition":
                    if (currentIssue.grade != issue[i]) {
                        returnInfo.change = true;
                    }

                    if (!issue[i] || issue[i] == "Select one") {
                        returnInfo.valid = false;
                        returnInfo.errors.push(issue[headers.indexOf('Number')] + " condition req.");
                    }

                    break;
                case "Location":
                    if (currentIssue.location != issue[i]) {
                        returnInfo.change = true;
                    }
                    break;
                case "Online":
                    
                    break;
                case "Overstreet":
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
    