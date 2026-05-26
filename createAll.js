function createAll () {
    const display = FORMSHEET.getRange(DISPLAYCELL);

    try {

        display.setValue("Working....\n\n");

        const auditDocument = getAuditDocument();
        const startRow = doChecks (auditDocument);

        if (!startRow) {
            return false;
        }

        FORMSHEET.activate();

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

        let j=1;
        for (let i=start; i<start+20; i++) {
            if (i >= titlesData.length) {
                display.setValue("Audits complete");
                return true;
            }

            let myTitle = new ComicTitle({
                id: titlesData[i][idIndex],
                title: null,
            });

            createTitleDocument({
                title: myTitle,
                document: auditDocument
            });

            display.setValue(display.getValue() + j++ + " ");
        }

        const nextTitle = new ComicTitle ({
            id: titlesData[start+20][idIndex],
            title:null
        });

        display.setValue ("Done!\n\n" +
            "Next title:\n\n" + nextTitle.title + " vol. " + nextTitle.volume + " (" +
                nextTitle.publisher.name + ")"
        );

        return true;

    } catch (error) {
        display.setValue ("Error creating all: " + error);
        return false;
    }
}