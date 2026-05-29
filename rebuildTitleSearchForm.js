function rebuildTitleSearchForm() {

    try {

        deleteFormsSheet();

        const sheet = FORMSHEET;

        // outer range
        let range = sheet.getRange(TS_RANGE);
        range.setBackground(TS_RANGE_BACKGROUND)
            .setBorder(true, true, true, true, false, false, 
                "black", SpreadsheetApp.BorderStyle.DOUBLE);

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

        range = sheet.getRange(TS_CURRENT_TITLES)
                    .setBackground("#ffffff")
                    .merge()
                    .setFontColor("black")
                    .setHorizontalAlignment("center")
                    .setVerticalAlignment("middle")
                    .setBorder(true, true, true, true, false, false,
                        "black", SpreadsheetApp.BorderStyle.SOLID
                    );

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
            .requireValueInList(["Select one", "Search", "Edit selected"])
            .setAllowInvalid(false)
            .build();

        SpreadsheetApp.flush();

        range = sheet.getRange(TS_FUNCTIONS)
                .setDataValidation(functionsRule)
                .setValue("Select one");


        // let tfc = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Copy of Forms");
        // let td = tfc.getRange("B12");
        // let trow = tfc.getRange("B10").getRow();

        // td.setValue (
        //     ""
        // );

        return true;
    }
    catch (error) {

        return false;
    }
}