function createTitleDocument (comicTitle) {

    const display = FORMSHEET.getRange(DISPLAYCELL);

    try {
        const folder = DriveApp.getFolderById(AUDITFOLDER);
        const filename = comicTitle.title + "_" + comicTitle.publisher.name + "_vol" + comicTitle.volume;
        const files = folder.getFilesByName(filename);

        let auditDocument = null;
        let doc_id = null;
        let auditFile = null;

        if (files.hasNext()) {
            auditDocument = DocumentApp.openById(files.next().getId());            
        }
        else {
            auditDocument = DocumentApp.create(filename);
            doc_id = auditDocument.getId();

            auditFile = DriveApp.getFileById(doc_id);
            auditFile.moveTo(folder);
        }


        const docBody = auditDocument.getBody();
        const docTitle = docBody.insertParagraph(0, 
            comicTitle.title + " vol. " + comicTitle.volume + " (" + comicTitle.publisher.name + ")");

        docTitle.setHeading(DocumentApp.ParagraphHeading.TITLE);


        display.setValue("Done!");

        return true;

    } catch (error) {
        display.setValue ("Error making document: " + error);
        return false;
    }

}