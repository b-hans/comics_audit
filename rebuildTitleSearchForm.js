function rebuildTitleSearchForm() {

    try {

        const cache = CacheService.getScriptCache();

        deleteFormsSheet();

        const sheet = FORMSHEET;

        // outer range
        let range = sheet.getRange(TS_RANGE);
        range.setBackground(TS_RANGE_BACKGROUND)
            .setBorder(true, true, true, true, false, false, 
                "black", SpreadsheetApp.BorderStyle.DOUBLE);

        range = sheet.getRange("A1")
                .setFontColor(TS_RANGE_BACKGROUND)
                .setValue("titlesearch");

        range = sheet.getRange(TS_TITLE_RANGE)
                .merge()
                .setBackground("white")
                .setBorder (true, true, true, true, false, false,
                    "black", SpreadsheetApp.BorderStyle.SOLID_MEDIUM)
                .setHorizontalAlignment("center")
                .setVerticalAlignment("middle")
                .setFontFamily("DynaPuff")
                .setFontSize(18)
                .setValue("Title Search");

        range = sheet.getRange(TS_CURRENT_TITLES_LABEL)
                    .setBackground("#cfe2f3")
                    .setFontColor("#7A367A")
                    .setHorizontalAlignment("right")
                    .setVerticalAlignment("middle")
                    .setFontFamily("Comic Sans MS")
                    .setFontSize(10)
                    .setValue("Titles: ");

        range = sheet.getRange(TS_SEARCH_TITLES_LABEL)
                    .setBackground("#cfe2f3")
                    .setFontColor("#7A367A")
                    .setHorizontalAlignment("right")
                    .setVerticalAlignment("middle")
                    .setFontFamily("Comic Sans MS")
                    .setFontSize(10)
                    .setValue("Search Title: ");

        let titlesRange = sheet.getRange(TS_CURRENT_TITLES)
                    .setBackground("#ffffff")
                    .merge()
                    .setFontColor("black")
                    .setHorizontalAlignment("center")
                    .setVerticalAlignment("middle")
                    .setBorder(true, true, true, true, false, false,
                        "black", SpreadsheetApp.BorderStyle.SOLID
                    );

        let cacheSearch = cache.get("current_search");
        if (cacheSearch) {
            let newRule = SpreadsheetApp.newDataValidation()
                .requireValueInList(JSON.parse(cacheSearch), true)
                .setAllowInvalid(false)
                .build();

            SpreadsheetApp.flush();
            titlesRange.setDataValidation(newRule);

            let cacheSelected = cache.get("current_edit");
            if (cacheSelected) {
                titlesRange.setValue(cacheSelected);
            }
        }

        range = sheet.getRange(TS_SEARCH_TITLES)
                    .setBackground("#ffffff")
                    .merge()
                    .setFontColor("black")
                    .setHorizontalAlignment("left")
                    .setVerticalAlignment("middle")
                    .setBorder(true, true, true, true, false, false,
                        "black", SpreadsheetApp.BorderStyle.SOLID
                    );

        let row = sheet.setRowHeight(10, 48);

        range = sheet.getRange(TS_FUNCTIONS_LABEL)
            .setBackground("#cfe2f3")
            .setFontColor("#7A367A")
            .setHorizontalAlignment("right")
            .setVerticalAlignment("middle")
            .setFontFamily("Comic Sans MS")
            .setFontSize(10)
            .setValue("Functions: ");

        range = sheet.getRange(TS_FUNCTIONS)
                    .setBackground("#ffffff")
                    .merge()
                    .setFontColor("black")
                    .setHorizontalAlignment("center")
                    .setVerticalAlignment("middle")
                    .setBorder(true, true, true, true, false, false,
                        "black", SpreadsheetApp.BorderStyle.SOLID
                    );

        range = sheet.getRange(TS_DISPLAY_RANGE)
                .merge()
                .setBackground("#f3f3f3")
                .setBorder (true, true, true, true, false, false,
                    "black", SpreadsheetApp.BorderStyle.SOLID
                )
                .setHorizontalAlignment("left")
                .setVerticalAlignment("top");

        let functionsRule = SpreadsheetApp.newDataValidation()
            .requireValueInList(["Select one", "Search", "Edit selected", "Add title"])
            .setAllowInvalid(false)
            .build();

        SpreadsheetApp.flush();

        range = sheet.getRange(TS_FUNCTIONS)
                .setDataValidation(functionsRule)
                .setValue("Select one");

        return true;
    }
    catch (error) {

        return false;
    }
}