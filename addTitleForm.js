function addTitleForm () {
    
    buildEditForm();

    const display = FORMSHEET.getRange(TE_DISPLAY);

    try {

        display.setValue ("New title form");
        return true;

    } catch (error) {
        display.setValue("Error getting add title: " + error);
        return false;
    }

}