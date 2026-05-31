function searchMenu(params) {

    const range = params.range;
    const menuType = range.getValue();
    const display = FORMSHEET.getRange(TS_DISPLAY_RANGE);
    const cache = CacheService.getScriptCache();

    range.setValue("Select one");

    if (menuType == "Search") {

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
    else if (menuType == "Edit selected") {
        const editTitle = FORMSHEET.getRange(TS_CURRENT_TITLES).getValue();

        if (!editTitle || editTitle == "Select a title") {
            display.setValue ("No title has been selected");
            return false;
        }

        cache.put("current_edit", editTitle, 3600);

        display.setValue ("Working...");

        return editComicTitle({
            display: display,
            title: editTitle,
            ui: ui
        });
    }
    else {
        display.setValue ("Function error");
        return false;
    }

}