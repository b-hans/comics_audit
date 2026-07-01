function buildEndForm (params) {
    const display = params.display;

    try {

        var sheet = FORMSHEET;
        var maxRows = sheet.getMaxRows();
        var lastRow = sheet.getLastRow();
        
        // Calculate how many trailing rows exist
        var rowsToDelete = maxRows - lastRow;
        
        // Delete rows only if there are empty rows at the bottom
        if (rowsToDelete > 0) {
            sheet.deleteRows(lastRow + 1, rowsToDelete);            
        }
        
        let iLastRow = FORMSHEET.getLastRow()+1;

        let iRange = FORMSHEET.getRange(iLastRow, 1, 2, TE_issue_id_column)
            .setBackground("#f3f3f3")
            .clearDataValidations();

        return true;
    }
    catch (error) {
        display.setValue ("Error building end of form: " + error);
        return false;
    }
}