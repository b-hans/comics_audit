function getConditions () {

    try {

        const conditionData = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName("Grading ID")
            .getDataRange()
            .getValues();

        const headers = conditionData.shift();

        if (conditionData && headers) {
            let dropdownValues = conditionData.map ( row => row[headers.indexOf('Condition')] );

            return {
                valid: true,
                data: conditionData,
                headers: headers,
                dropdown: dropdownValues
            }
        }
        else {
            return { valid: false }
        }

        return true;
    } catch (error) {
        ui.alert ("Error: " + error);
        return { valid: false }
    }
}