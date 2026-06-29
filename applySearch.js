function applySearch (params) {
    const display = params.display;
    const searchTerm = params.searchTerm;
    const cache = CacheService.getScriptCache();

    try {

        let dropdownRange = FORMSHEET.getRange(TS_CURRENT_TITLES)
            .clearDataValidations()
            .clearContent();

        let results = getTitles(params);

        if (!results.valid) {
            display.setValue ("Not found: " + searchTerm);
            return false;
        }

        if (FORMSHEET.getRange(TS_CURRENT_TITLES_LABEL).getValue() != "Titles: ") {
            if (!showTitlesMenu({display: display})) {
                display.setValue ("Problem");
                return false;
            }
        }

        // put results in cache for current search results
        cache.put('current_search', JSON.stringify(results.titles), 3600);

        let rule = SpreadsheetApp.newDataValidation()
            .requireValueInList(results.titles, true)
            .setAllowInvalid(false)
            .build();
        
        SpreadsheetApp.flush();
        FORMSHEET.getRange(TS_CURRENT_TITLES)
            .setDataValidation(rule)
            .setValue(results.titles[0]);

        display.setValue("Check titles");

        return true;

    } catch (error) {
        display.setValue ("Error searching titles: " + error);
        return false;
    }
}