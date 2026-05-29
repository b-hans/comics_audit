function applySearch (params) {
    const display = params.display;
    const searchTerm = params.searchTerm;

    try {

        let dropdownRange = FORMSHEET.getRange(TS_CURRENT_TITLES)
            .clearDataValidations()
            .clearContent();

        let results = getTitles(params);

        if (!results.valid) {
            display.setValue ("Not found: " + searchTerm);
            return false;
        }

        let rule = SpreadsheetApp.newDataValidation()
            .requireValueInList(results.titles, true)
            .setAllowInvalid(false)
            .build();
        
        SpreadsheetApp.flush();
        FORMSHEET.getRange(TS_CURRENT_TITLES)
            .setDataValidation(rule)
            .setValue("Select a title");

        display.setValue("Check titles");

        return true;

    } catch (error) {
        display.setValue ("Error searching titles: " + error);
        return false;
    }
}