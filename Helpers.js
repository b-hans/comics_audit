function menuOnEdit(e) {

    const range = e.range;
    const sheet = range.getSheet();

    const displayRange = FORMSHEET.getRange(DISPLAYCELL);
    const menuRange = FORMSHEET.getRange(MENUCELL);
    const optionsRange = FORMSHEET.getRange(OPTIONSCELL);

    try {

        if (sheet.getName() != FORMSHEET.getName() || (
            range.getA1Notation() != MENUCELL) &&
            range.getA1Notation() != OPTIONSCELL
            ) {
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
            case "Create one":
                return createOne();

            case "Create all":
                return createAll();

            case "Search title":
                return searchTitle();
                
            default:
                displayRange.setValue ("test: " + menuType);
                break;
        }

        

        return true;

    } catch (error) {
        displayRange.setValue ("Error: " + error);
        return false;
    }
    
}