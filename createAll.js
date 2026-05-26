function createAll () {
    const display = FORMSHEET.getRange(DISPLAYCELL);

    try {

        display.setValue("Working....");

        const auditDocument = getAuditDocument();
        const startRow = doChecks (auditDocument);

        if (!startRow) {
            return false;
        }

        let titlesData = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName("Title table")
            .getDataRange()
            .getValues();

        let headers = titlesData.shift();

        const idIndex = headers.indexOf('id');

        // find the active cell
        const titleSheet = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName("Title table");

        const start = startRow - 2;

        for (let i=start; i<start+60; i++) {
            let myTitle = new ComicTitle({
                id: titlesData[i][idIndex],
                title: null,
            });

            createTitleDocument({
                title: myTitle,
                document: auditDocument
            });
        }

        display.setValue ("Done!");

        FORMSHEET.activate();

        return true;

    } catch (error) {
        display.setValue ("Error creating all: " + error);
        return false;
    }
}