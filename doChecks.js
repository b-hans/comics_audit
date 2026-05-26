function doChecks (auditDocument) {

    const display = FORMSHEET.getRange(DISPLAYCELL);

    //determine active sheet and cell
    const cellStatus = getCurrentCellStatus();

    if (!cellStatus.valid) {
            display.setValue (
                "Start this function from \"Title table\" \n" +
                "in row with next comic title to write"
            );

        FORMSHEET.activate();
        return false;
    }

    // check for title exist

    const startTitleData = cellStatus.currentTitle.title + " vol. " +
            cellStatus.currentTitle.volume + " \\(" +
            cellStatus.currentTitle.publisher.name + "\\)";

    const startTitle = cellStatus.currentTitle.title + " vol. " +
            cellStatus.currentTitle.volume + " (" +
            cellStatus.currentTitle.publisher.name + ")";

    const body = auditDocument.getBody();
    const searchResult = body.findText(startTitleData);

    if (searchResult !== null) {
        display.setValue ("It appears that this title is already in the audit\n\n" +
            startTitle
        );
        FORMSHEET.activate();
        return false;
    }

    return cellStatus.currentRowNumber;

}