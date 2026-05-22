function menuOnEdit(e) {

    const range = e.range;
    const sheet = range.getSheet();

    const displayRange = FORMSHEET.getRange(DISPLAYCELL);
    const menuRange = FORMSHEET.getRange(MENUCELL);

    try {

        if (sheet.getName() != FORMSHEET.getName() ||
            range.getA1Notation() != MENUCELL) {
            return true;
        }

        const menuType = range.getValue();
        menuRange.setValue(MENUDEFAULT);

        displayRange.setValue ("test: " + menuType);

        return true;

    } catch (error) {
        console.log ("Error: " + error);
        return false;
    }
    
}