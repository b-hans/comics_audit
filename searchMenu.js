function searchMenu(params) {
    const ui = SpreadsheetApp.getUi();

    const range = params.range;
    const menuType = range.getValue();
    const display = FORMSHEET.getRange(TS_DISPLAY_RANGE);

    range.setValue("Select one");

    const searchValue = FORMSHEET.getRange(TS_SEARCH_TITLE_RANGE).getValue();

    if (!searchValue) {
        display.setValue ("The search field is empty");
        return false;
    }

    return applySearch({
        searchTerm: searchValue,
        display: display
    });

}