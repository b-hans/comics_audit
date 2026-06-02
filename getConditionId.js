function getConditionId (params) {

    const display = params.display;
    const grade = params.grade;

    try {

        const conditionData = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName("Grading ID")
            .getDataRange()
            .getValues();

        const headers = conditionData.shift();

        let return_id = conditionData.find (row => row[headers.indexOf('Condition')] == grade);

        if (return_id) {
            return return_id[headers.indexOf('id')];
        }
        else {
            return null;
        } 
            
    } catch (error) {
        display.setValue ("Error getting condition id: " + error);
        return false;
    }
}