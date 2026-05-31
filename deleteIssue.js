function deleteIssue (rangeRow) {

    try {

        const idCol = 9;
        const optionsCol = 1;

        let issueRange = FORMSHEET.getRange(rangeRow, 1, 1, 9).getValues();

        FORMSHEET.getRange(rangeRow, optionsCol, 1, 1).setValue ("Options");
        
        ui.alert ("Delete issue: " + issueRange[0][8]);

    } catch (error) {
        ui.alert ("Error: " + error);
        return false;
    }


}