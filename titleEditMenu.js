function titleEditMenu (params) {

    const menuA1 = "E6";
    const defaultMenu = "Functions";

    try {

        const range = params.range;
        const menuValue = range.getValue();
        const rangeColumn = range.getColumn();
        const rangeRow = range.getRow();

        if (rangeColumn == 1 && menuValue && menuValue != "Options") {
            if (menuValue == "Edit") {
                return editIssue(rangeRow);
            }
            else if (menuValue == "Delete") {
                return deleteIssue(rangeRow);
            }
            else if (menuValue == "Insert it") {
                
                let response = ui.alert(
                    'Confirmation Required',
                    'You are about to add this issue, do you wish to continue?',
                    ui.ButtonSet.YES_NO
                );

                if (response == ui.Button.YES) {
                    return insertIssue();
                }
                else {
                    FORMSHEET.getRange(TE_issue_start_row, 1, 1, 1).setValue("Options");
                }

                return true;
            }
            else if (menuValue == "Cancel insert") {

                let response = ui.alert(
                    'Confirmation Required',
                    'Do you wish to cance the issue insert?',
                    ui.ButtonSet.YES_NO
                );

                if (response == ui.Button.YES) {
                    FORMSHEET.deleteRow(TE_issue_start_row);
                    return true;                    
                }

                FORMSHEET.getRange(TE_issue_start_row, 1, 1, 1)
                    .setValue("Options");

                ui.alert ("Continue insert");

                return true;

            }
            else {
                return true;
            }
        }
        
        if (range.getA1Notation() != menuA1 ||
            menuValue == "Functions") {
                return true;
        }

        range.setValue(defaultMenu);

        switch (menuValue) {

            case "Cancel":
                return rebuildTitleSearchForm();

            case "Edit title":
                return editTitle();

            case "Add issue":
                return addIssue();

            default:
                ui.alert ("menu: " + menuValue);
        }
        

        return true;
    } catch (error) {
        ui.alert ("Problem: " + error);
        return false;
    }
}