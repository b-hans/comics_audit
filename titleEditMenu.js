function titleEditMenu (params) {

    const menuA1 = "E6";
    const defaultMenu = "Functions";
    const display = getDisplay("TE");

    try {

        const range = params.range;
        const menuValue = range.getValue();
        const rangeColumn = range.getColumn();
        const rangeRow = range.getRow();

        if (range.getA1Notation() == TE_CONFIRMATION && menuValue != "Select") {
            if (menuValue == "No") {
                clearSelect("TE");
            }
            else if (menuValue == "Cancel insert issue") {
                cancelNewIssue();
            }
            else if (menuValue == "Yes, insert") {
                return insertIssue();
            }
            return true;
        }
        else if (rangeColumn == 1 && menuValue && menuValue != "Options") {
            if (menuValue == "Edit") {
                return editIssue(rangeRow);
            }
            else if (menuValue == "Delete") {
                return deleteIssue(rangeRow);
            }
            else if (menuValue == "Insert it") {

                let params = {
                    display:    display,
                    options:    FORMSHEET.getRange(TE_issue_start_row, 1, 1, 1),
                    text:       "Options"
                }

                if (newIssueValid(params)) {
                    return insertConfirmation({
                        text:           "Confirmation required\n\nAdd this issue?",
                        display:        display,
                        optionsRange:   FORMSHEET.getRange(TE_issue_start_row, 1, 1, 1),
                        options:        ['Select', "Yes, insert", "No"]
                    });                
                }
                else {
                    return true;
                }
            }
            else if (menuValue == "Cancel insert") {

                return insertConfirmation({
                    text:           "Confirmation required\n\nDo you wish to cancel?",
                    display:        display,
                    optionsRange:   FORMSHEET.getRange(TE_issue_start_row, 1, 1, 1),
                    options:        ['Select', "Cancel insert issue", "No"]
                });

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