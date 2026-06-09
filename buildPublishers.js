function buildPublishers (params) {

    const cache = params.cache;
    const display = FORMSHEET.getRange(PUB_DISPLAY_RANGE);

    try {

        const sheet = FORMSHEET;

        deleteFormsSheet();

        for (let i=0; i<PUB_NEW_RANGES.length; i++) {
            let item = PUB_NEW_RANGES[i];
            let tRange = sheet.getRange(item.a1notation);
            if (item.merge) {
                tRange.merge();
            }

            tRange.setBackground(item.background)
                .setFontFamily(item.font_family)
                .setFontColor(item.font_color)
                .setFontSize(item.font_size)
                .setHorizontalAlignment(item.horizontal)
                .setVerticalAlignment(item.vertical)
                .setValue(item.text);

            if (item.borders) {
                tRange.setBorder(
                    item.borders[0],
                    item.borders[1],
                    item.borders[2],
                    item.borders[3],
                    item.borders[4],
                    item.borders[5],                
                    item.bordercolor, item.borderstyle);
            }
            if (item.wrap) {
                tRange.setWrap(item.wrap);
            }
        }

        for (let i=1; i<PUB_ROW_HEIGHTS.length-1; i++) {
            sheet.setRowHeight(i, PUB_ROW_HEIGHTS[i-1]);
        }

        for (let i=1; i<6; i++) {
            sheet.setColumnWidth(i, PUB_COL_WIDTHS);
        }

        sheet.getRange("A1")
            .setFontColor(LIGHT_ORANGE_3)
            .setValue("publishers");

        // now get the dropdowns
        let functionsRange = sheet.getRange(PUB_FUNCTIONS_RANGE);

        let functionRule = SpreadsheetApp.newDataValidation()
            .requireValueInList(PUB_FUNCTIONS_OPTIONS, true)
            .setAllowInvalid(false)
            .build();

        functionsRange.clearDataValidations()
            .clearContent();

        SpreadsheetApp.flush();

        functionsRange.setDataValidation(functionRule)
            .setValue(PUB_FUNCTIONS_OPTIONS[0]);


        const pubData = getPublisherData();
        const headers = pubData.headers;

        const pubNames = pubData.data.map (row => row[headers.indexOf('Publisher')]);
        pubNames.unshift("Select a publisher");

        let pubRule = SpreadsheetApp.newDataValidation()
            .requireValueInList(pubNames, true)
            .setAllowInvalid(false)
            .build();
        let pubRange = sheet.getRange(PUB_PUBLISHERS_DROPDOWN_RANGE)
            .clearDataValidations()
            .clearContent();

        SpreadsheetApp.flush();
        pubRange.setDataValidation(pubRule)
            .setValue(pubNames[0]);

        return true;
    } catch (error) {
        display.setValue ("Error building publishers form: " + error);
        return false;
    }
}