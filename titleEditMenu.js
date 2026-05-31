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
        }
        
        if (range.getA1Notation() != menuA1 ||
            menuValue == "Functions") {
                return true;
        }

        range.setValue(defaultMenu);

        switch (menuValue) {

            case "Cancel":
                return rebuildTitleSearchForm();

            default:
                ui.alert ("menu: " + menuValue);
        }
        

        return true;
    } catch (error) {
        ui.alert ("Problem: " + error);
        return false;
    }
}