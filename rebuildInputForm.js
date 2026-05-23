function rebuildInputForm () {

    const displayRange = FORMSHEET.getRange(DISPLAYCELL);
    const testSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Forms backup 2026-05-22');

    try {

        FORMSHEET.getRange("A1:G27")
            .clearDataValidations()
            .clearContent()
            .merge()
            .setBackground("white");

        FORMSHEET.getRange("A1:G27")
            .breakApart();


        let outerRange = FORMSHEET.getRange(OUTERRANGE.a1notation);
        outerRange.setBackground(OUTERRANGE.color);

        FORMSHEET.setRowHeights(
            OUTERRANGE.rowstart,
            OUTERRANGE.numrows,
            OUTERRANGE.rowheight
        );

        for (let i=0; i<OUTERRANGE.colwidths.length; i++) {
            FORMSHEET.setColumnWidth(i+1, OUTERRANGE.colwidths[i])
        }

        FORMSHEET.getRange(INNERRANGE.a1notation)
            .setBackground(INNERRANGE.background)
            .setBorder(
                INNERRANGE.borders[0],
                INNERRANGE.borders[1],
                INNERRANGE.borders[2],
                INNERRANGE.borders[3],
                INNERRANGE.borders[4],
                INNERRANGE.borders[5],                
                INNERRANGE.bordercolor, INNERRANGE.borderstyle);

        FORMSHEET.getRange(MENU.a1notation)
            .setBackground(MENU.background)
            .merge()
            .setHorizontalAlignment('center')
            .setVerticalAlignment('middle')
            .setBorder(
                MENU.borders[0],
                MENU.borders[1],
                MENU.borders[2],
                MENU.borders[3],
                MENU.borders[4],
                MENU.borders[5],
                MENU.bordercolor,
                MENU.borderstyle
            );

        let menuRule = SpreadsheetApp.newDataValidation()
            .requireValueInList(MENU.options)
            .setAllowInvalid(false)
            .build();

        let menuCell = FORMSHEET.getRange(MENUCELL);
        menuCell.clearDataValidations()
            .clearContent();
        
        SpreadsheetApp.flush();

        menuCell.setDataValidation(menuRule);
        menuCell.setValue(MENU.options[0]);
        
        FORMSHEET.getRange(DISPLAY.a1notation)
                .merge()
                .setBorder(
                    DISPLAY.borders[0],
                    DISPLAY.borders[1],
                    DISPLAY.borders[2],
                    DISPLAY.borders[3],
                    DISPLAY.borders[4],
                    DISPLAY.borders[5],
                    DISPLAY.bordercolor, DISPLAY.borderstyle
                )
                .setHorizontalAlignment(DISPLAY.horizontal)
                .setVerticalAlignment(DISPLAY.vertical)
                .setBackground(DISPLAY.background);


        displayRange.setValue ("");

        FORMSHEET.getRange(TITLEENTER.a1notation)
                .setBorder(
                    TITLEENTER.borders[0],
                    TITLEENTER.borders[1],
                    TITLEENTER.borders[2],
                    TITLEENTER.borders[3],
                    TITLEENTER.borders[4],
                    TITLEENTER.borders[5],
                    TITLEENTER.bordercolor, 
                    TITLEENTER.borderstyle
                )
                .setBackground(TITLEENTER.background)
                .setHorizontalAlignment(TITLEENTER.horizontal)
                .setVerticalAlignment(TITLEENTER.vertical)
                .setValue("Enter title here");


        FORMSHEET.getRange(MENUOPTIONS.a1notation)
            .setBackground(MENUOPTIONS.background)
            .setHorizontalAlignment('center')
            .setVerticalAlignment('middle');

        let optionsRule = SpreadsheetApp.newDataValidation()
            .requireValueInList(MENUOPTIONS.options)
            .setAllowInvalid(false)
            .build();

        let optionsCell = FORMSHEET.getRange(MENUOPTIONS.a1notation);
        optionsCell.clearDataValidations()
            .clearContent();
        
        SpreadsheetApp.flush();

        optionsCell.setDataValidation(optionsRule);
        optionsCell.setValue(MENUOPTIONS.options[0]);

        return true;

    } catch (error) {
        displayRange.setValue ("Error: " + error);
        return false;
    }
}