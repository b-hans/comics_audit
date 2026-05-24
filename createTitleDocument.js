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
            let trashFile = files.next();
            trashFile.setTrashed(true);
        }

        auditDocument = DocumentApp.create(filename);
        doc_id = auditDocument.getId();

        auditFile = DriveApp.getFileById(doc_id);
        auditFile.moveTo(folder);

        const docBody = auditDocument.getBody();
        const docTitle = docBody.insertParagraph(0, 
            comicTitle.title + " vol. " + comicTitle.volume + " (" + comicTitle.publisher.name + ")");

        docTitle.setHeading(DocumentApp.ParagraphHeading.TITLE);
        docTitle.setAttributes(titleStyle);

        const titleNumbers = docBody.appendParagraph(
            comicTitle.num_first + "\u2013" + comicTitle.num_last
        );
        titleNumbers.setAttributes(regStyle);

        const tableHeaders = [[
            '',
            'Number',
            'Month',
            'Year',
            'Condition',
            'Value',
            'Note'
        ]];

        /***************************************

            [
                String.fromCharCode(9744),
                '1',
                'January',
                '1936',
                'NM',
                '$1,000,000',
                ''
            ]

        ******************************************/

        const issueTable = docBody.appendTable(tableHeaders);
        issueTable.setBorderColor('#ffffff');

        const headerRow = issueTable.getRow(0);

        // header styles
        for (let i=0; i<headerRow.getNumCells(); i++) {
            let cell = headerRow.getCell(i);
            cell.setAttributes(tableHeaderStyle);

            for (let j=0; j<cell.getNumChildren(); j++) {
                cell.getChild(j).setAttributes(tableHeaderParagraphStyle);
            }
        }

        for (let i=0; i<comicTitle.issues.length; i++) {
            let myIssue = comicTitle.issues[i];
            let issueRow = issueTable.appendTableRow();
            issueRow.appendTableCell(String.fromCharCode(9744));
            issueRow.appendTableCell(parseInt(myIssue.number).toFixed(0));
            issueRow.appendTableCell(myIssue.month);
            issueRow.appendTableCell(parseInt(myIssue.year).toFixed(0));
            issueRow.appendTableCell("NM");
            issueRow.appendTableCell(usdFormatter.format(myIssue.online));
        }
        
        display.setValue("Done!");

        return true;

    } catch (error) {
        display.setValue ("Error making document: " + error);
        return false;
    }

}