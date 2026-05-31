function titleEditMenu (params) {

    const ui = SpreadsheetApp.getUi();
    const menuA1 = "E6";
    const defaultMenu = "Functions";

    try {

        const range = params.range;
        const menuValue = range.getValue();
        
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