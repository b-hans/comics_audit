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
    else if (menuType == "Add title") {
        return addTitleForm();
    }
    else if (menuType == "Update repo") {
        return updateRepo({display: display});
    }
    else if (menuType == "Publishers") {
        return buildPublishers({cache: cache});
    }
    else {
        display.setValue ("Function error");
        return false;
    }

}