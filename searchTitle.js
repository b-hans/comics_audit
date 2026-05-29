function searchTitle () {

    const display = FORMSHEET.getRange(DISPLAYCELL);
    const searchTitle = FORMSHEET.getRange(TITLESEARCHCELL).getValue();

    try {

        display.setValue("Working....");

        if (!searchTitle || searchTitle == "Enter title here") {
            display.setValue ("You need to enter a title to search");
            return false;
        }

        FORMSHEET.getRange(TITLESEARCHCELL).setValue (TITLEDEFAULT);

        let searcher = new ComicTitle({
            title: searchTitle,
            id: null
        });

        if (searcher.valid) {

            const folder = DriveApp.getFolderById(AUDITFOLDER);
            const filename = searcher.title + "_" + 
                searcher.publisher.name + "_vol" + searcher.volume;
            const files = folder.getFilesByName(filename);

            let auditDocument = null;
            let doc_id = null;
            let auditFile = null;

            if (files.hasNext()) {
                return true;
                // let trashFile = files.next();
                // trashFile.setTrashed(true);
            }

            auditDocument = DocumentApp.create(filename);
            doc_id = auditDocument.getId();

            auditFile = DriveApp.getFileById(doc_id);
            auditFile.moveTo(folder);

            display.setValue ("check document");
            
            return createTitleDocument({
                title: searcher,
                document: auditDocument
            });

        }
        else if (searcher.multiple) {
            display.setValue ("Multiple titles: " + searchTitle);
        }
        else {
            display.setValue ("Not found: " + searchTitle);
        }

        return true;
    } catch (error) {
        display.setValue("Error: " + error);
        return false;
    }


}