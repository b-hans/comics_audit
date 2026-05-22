function rebuildInputForm () {

    const displayRange = FORMSHEET.getRange(DISPLAYCELL);
    const testSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Forms backup 2026-05-22');


    try {

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
            .setBorder(true, true, true, true, false, false, 
                INNERRANGE.bordercolor, INNERRANGE.borderstyle);

        // get the column widths

        let testBorders = testSheet.getRange(INNERRANGE.a1notation).getBorder();

        displayRange.setValue ("next2");

        return true;

    } catch (error) {
        displayRange.setValue ("Error: " + error);
        return false;
    }
}