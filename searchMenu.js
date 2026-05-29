function searchMenu(params) {
    const ui = SpreadsheetApp.getUi();

    const range = params.range;
    const menuType = range.getValue();
    const display = FORMSHEET.getRange(TS_DISPLAY_RANGE);

    range.setValue("Select one");


    display.setValue("Test: " + menuType);

    return true;
}