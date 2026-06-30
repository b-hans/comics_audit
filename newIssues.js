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

        const title_id = FORMSHEET.getRange(TE_ID_RANGE).getValue();
        const publisher = FORMSHEET.getRange(TE_PUBLISHER_DROPDOWN_RANGE).getValue();

        const publisher_id = getPublisherFromDropdown({display: display, publisher: publisher});

        const start = TE_issue_start_row;
        const end = FORMSHEET.getLastRow();
        const numRows = end - start + 1;
        const numCols = FORMSHEET.getLastColumn();

        const newIssuesRange = FORMSHEET.getRange(start, 1, numRows, numCols);

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

        if (data.length < 1) {
            display.setValue ("No changes to add");
            return true;
        }

        let errorList = "";

        for (let i=0; i<data.length; i++) {
            if (!data[i][headers.Condition]) {
                errorList += "Condition required: #" + data[i][1] + "\n";
            }
            if (isNotValidCurrency(usdFormatter.format(data[i][headers.Online]))) {
                errorList += "Not valid currency: " + data[i][headers.Number];
            }
        }

        if (errorList) {
            display.setValue(errorList);
            return false;
        }

        // get the currentIssues
        const currentIssues = JSON.parse(cache.get("issuesData"));

        const sheet = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName('MyComics');

        // get the last id number
        const sheetIds = sheet.getRange(2, 1, sheet.getLastRow(), 1).getValues().flat().filter(Boolean);
        let startId = Math.max(...sheetIds)+1;

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

            // item.push(new_id);
            item[0] = "Options";
            item[8] = new_id;

            sheet.appendRow(newRow);
            currentIssues.push(item);

        }

        currentIssues.sort ((a, b) => a[headers.Number] - b[headers.Number]);
        cache.put("issuesData", JSON.stringify(currentIssues), 3600);

        // now redo the needed
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

            newRange.setValues(newNeeded);

            display.setValue ("Done!");

            return styleIssuesRange({display: display, range: newRange, type: "neededIssues"});
        }

        display.setValue ("Done!");

        return true;
    } catch (error) {
        display.setValue ("Error inserting issues: " + error);
        return false;
    }
}