function newIssues (params) {

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

        display.setValue("Working....")

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
            return true;
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

        // get the currentIssues from the cache
        const currentIssues = JSON.parse(cache.get("issuesData"));

        // the issues sheet - where we enter new data
        const sheet = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName('MyComics');

        // get the last id number
        const sheetIds = sheet.getRange(2, 1, sheet.getLastRow(), 1).getValues().flat().filter(Boolean);
        let startId = Math.max(...sheetIds)+1;

        // enter the new data here
        for (let i=0; i<data.length; i++) {
            // construct the row to insert
            let item = data[i];
            let condition_id = getConditionId({display: display, grade: item[headers.Condition]});
            let new_id = startId++;
            let newRow = [new_id, title_id, publisher_id, 
                item[headers.Number],
                item[headers.Month],
                item[headers.Year],
                condition_id,
                item[headers.Notes],
                item[headers.Location],
                item[headers.Online],
                ""
            ];

            // adding the needed array items for the myIssues array
            item[0] = "Options";
            item[8] = new_id;

            // add the new data to the sheet
            sheet.appendRow(newRow);

            // push the new item into the current issues array
            currentIssues.push(item);

        }

        // sort the current issues after inserting new data
        currentIssues.sort ((a, b) => a[headers.Number] - b[headers.Number]);

        // put the edited data into cache
        cache.put("issuesData", JSON.stringify(currentIssues), 3600);

        // now rewrite the needed array
        let currentNeededRange = FORMSHEET.getRange(start, 1, numRows, numCols);
        let currentNeededData = currentNeededRange.getValues();

        let newNeeded = currentNeededData.filter ( item => {

                if (data.some(row => row[headers.Number] == item[headers.Number])) {
                    return false;
                }

                return true;

            }            
        );

        FORMSHEET.deleteRows(start, numRows);

        if (newNeeded.length > 0) {
            let newRange = FORMSHEET.getRange(start, 1, newNeeded.length, numCols);

            if (!styleIssuesRange({
                display:    display, 
                range:      newRange, 
                type:       "neededIssues",
                data:       newNeeded,
            })){
                display.setValue ("Problem setting revised needed");
                return false;
            };
        }

        display.setValue ("Done!");

        return true;
    } catch (error) {
        display.setValue ("Error inserting issues: " + error);
        return false;
    }
}