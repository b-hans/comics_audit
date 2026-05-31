function buildEditForm() {
    deleteFormsSheet();

    const ui = SpreadsheetApp.getUi();

    let range = FORMSHEET.getRange(TE_OUTERRANGE.a1notation)
        .setBackground(TE_OUTERRANGE.background)
        .setFontColor(TE_OUTERRANGE.color);

    range = FORMSHEET.getRange("A1").setValue(TE_TYPE);

    for (let i=0; i<TE_OUTERRANGE.rowheights.length; i++) {
        FORMSHEET.setRowHeight(i+1, TE_OUTERRANGE.rowheights[i]);
    }

    for (let i=0; i<TE_OUTERRANGE.colwidths.length; i++) {
        FORMSHEET.setColumnWidth(i+1, TE_OUTERRANGE.colwidths[i]);
    }

    for (let i=0; i<TE_innerRanges.length; i++) {
        let myItem = TE_innerRanges[i];
        let myRange = FORMSHEET.getRange(myItem.a1notation);

        if (myItem.merge) {
            myRange.merge();
        }

        myRange.setBackground(myItem.background)
            .setFontColor(myItem.fontColor)
            .setFontSize(myItem.fontSize)
            .setFontFamily(myItem.fontFamily)
            .setHorizontalAlignment(myItem.horizontal)
            .setVerticalAlignment(myItem.vertical);

        if (myItem.value) {
            myRange.setValue(myItem.value);
        }

        if (myItem.border) {
            let bor = myItem.border;
            myRange.setBorder(
                bor[0],
                bor[1],
                bor[2],
                bor[3],
                bor[4],
                bor[5],
                bor[6],
                bor[7],
            );
        }

        if (myItem.options) {
            let newRule = SpreadsheetApp.newDataValidation()
                .requireValueInList(myItem.options, true)
                .setAllowInvalid(false)
                .build();
            
            SpreadsheetApp.flush();
            myRange.setDataValidation(newRule);
            myRange.setValue(myItem.options[0]);
        }
    }

    const publisherData = getPublisherData();

    const publisherRule = SpreadsheetApp.newDataValidation()
        .requireValueInList(publisherData.dropdown, true)
        .setAllowInvalid(false)
        .build();

    SpreadsheetApp.flush();

    FORMSHEET.getRange(TE_PUBLISHER_DROPDOWN_RANGE)
        .setDataValidation(publisherRule);

    return true;

}