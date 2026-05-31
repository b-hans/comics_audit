function menuOnEdit(e) {

    const range = e.range;
    const sheet = range.getSheet();

    const displayRange = FORMSHEET.getRange(DISPLAYCELL);
    const menuRange = FORMSHEET.getRange(MENUCELL);
    const optionsRange = FORMSHEET.getRange(OPTIONSCELL);

    const formType = FORMSHEET.getRange("A1").getValue();

    try {

        if (sheet.getName() != FORMSHEET.getName()) {
            return true;
        }

        // This is title search functions
        if (range.getA1Notation() == "C10" && formType == "titlesearch") {
            return searchMenu({
                range: range
            });
        }
        else if (formType == "titleedit") {
            return titleEditMenu ({ range: range});
        }
        else if (formType != "audit") {
            return true;
        }

        let menuType = "";

        if (menuRange.getValue() != MENUDEFAULT) {
            menuType = menuRange.getValue();
        }
        else {
            menuType = optionsRange.getValue();
        }
        
        menuRange.setValue(MENUDEFAULT);
        optionsRange.setValue(MENUOPTIONS.options[0]);

        switch (menuType) {

            case "Search title":
                return searchTitle(e);
                
            case "Instructions":
                displayRange.setValue (
                    "Instructions\n\n" +
                    "Go to Title table and activate the row to start\n" +
                    "Then select \"Create all\" from \n" +
                    "the form rebuilds custom menu"
                );
                break;

            default:
                displayRange.setValue("");
        }

        return true;

    } catch (error) {
        displayRange.setValue ("Error: " + error);
        return false;
    }
    
}