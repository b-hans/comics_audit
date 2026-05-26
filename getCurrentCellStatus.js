function getCurrentCellStatus() {

    const currentSheet = SpreadsheetApp
        .getActiveSpreadsheet()
        .getActiveSheet();

    const currentCell = currentSheet.getActiveCell();
    const currentRow = currentCell.getRow();
    const currentSheetName = currentSheet.getName();

    const currentRowRange = currentSheet.getRange(
        currentRow, 1, 1, currentSheet.getLastColumn()
    );
    
    if (currentSheetName != "Title table" ||
        currentRow == 1 ||
        currentRowRange.isBlank()
    ) {
        return {
            valid: false
        }
    }

    const currentRowData = currentRowRange.getValues()[0];

    const startTitle = new ComicTitle ({
        id: currentRowData[0],
        title: null
    });

    return {
        currentRowNumber: currentRow,
        currentTitle: startTitle,
        valid: true
    }

}