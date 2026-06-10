function rebuildPublishersDropdown (params) {
    const type = params.type;
    const display = params.display;
    const range = params.range

    try {

        let sheet = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName("Publishers ID");

        let data = sheet.getDataRange().getValues();
        let headers = data.shift();
        let marvel = data.shift();
        let dc = data.shift();

        let dropdownValues;

        data.sort((a, b) => 
            a[headers.indexOf('Publisher')].localeCompare(b[headers.indexOf('Publisher')])
        );

        data.unshift(dc);
        data.unshift(marvel);

        dropdownValues = data.map(row => row[headers.indexOf('Publisher')]);
        dropdownValues.unshift("Select a publisher");
        
        data.unshift(headers);

        sheet.clearContents();

        sheet.getRange(1, 1, data.length, data[0].length)
            .setValues(data);
        
        range.clearDataValidations()
            .clearContent();

        let newRule = SpreadsheetApp.newDataValidation()
            .requireValueInList(dropdownValues, true)
            .setAllowInvalid(false)
            .build();

        SpreadsheetApp.flush();

        range.setDataValidation(newRule)
            .setValue(dropdownValues[0]);

        return true;
    } catch (error) {
        display.setValue ("Error rebuilding publishers dropdown: " + error);
        return false;
    }
}