function getAuditDocument () {

    // get the document
    const folder = DriveApp.getFolderById(AUDITFOLDER);
    const files = folder.getFilesByName("Audit document");

    if (files.hasNext()) {
        return DocumentApp.openById(files.next().getId());
    }
    else {
        const auditDocument = DocumentApp.create("Audit document");
        const ad_id = auditDocument.getId();

        const auditFile = DriveApp.getFileById(ad_id);
        auditFile.moveTo(folder);

        return auditDocument;

    }

}