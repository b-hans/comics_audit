function createAll () {
    const display = FORMSHEET.getRange(DISPLAYCELL);

    try {

        display.setValue("Working....");

        // get the document
        const folder = DriveApp.getFolderById(AUDITFOLDER);
        const files = folder.getFilesByName("Audit document");

        let auditDocument;

        if (files.hasNext()) {
            auditDocument = DocumentApp.openById(files.next().getId());
        }
        else {
            auditDocument = DocumentApp.create("Audit document");
            let ad_id = auditDocument.getId();

            let auditFile = DriveApp.getFileById(ad_id);
            auditFile.moveTo(folder);

        }


        let titlesData = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName("Title table")
            .getDataRange()
            .getValues();

        let headers = titlesData.shift();

        const idIndex = headers.indexOf('id');
        const start = titlesData.findIndex( row => row[idIndex] === STARTING_ID);

        for (let i=start; i<start+20; i++) {
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

        return true;

    } catch (error) {
        display.setValue ("Error creating all: " + error);
        return false;
    }
}