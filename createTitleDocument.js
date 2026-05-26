function createTitleDocument (params) {

    const display = FORMSHEET.getRange(DISPLAYCELL);

    try {

        const comicTitle = params.title;
        const auditDocument = params.document;

        // const folder = DriveApp.getFolderById(AUDITFOLDER);
        // const filename = comicTitle.title + "_" + comicTitle.publisher.name + "_vol" + comicTitle.volume;
        // const files = folder.getFilesByName(filename);

        // let auditDocument = null;
        // let doc_id = null;
        // let auditFile = null;

        // if (files.hasNext()) {
        //     return true;
        //     // let trashFile = files.next();
        //     // trashFile.setTrashed(true);
        // }

        // auditDocument = DocumentApp.create(filename);
        // doc_id = auditDocument.getId();

        // auditFile = DriveApp.getFileById(doc_id);
        // auditFile.moveTo(folder);

        const docBody = auditDocument.getBody();

        const docTitle = docBody.appendParagraph( 
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

        let color1 = "#f3f3f3";
        let color2 = "#cfe2f3";

        for (let i=0; i<comicTitle.issues.length; i++) {

            let myIssue = comicTitle.issues[i];
            let issueRow = issueTable.appendTableRow();

            const rowColor = (i % 2 === 0) ? color1 : color2;

            let col1 = issueRow.appendTableCell(" ")
                .setBackgroundColor(rowColor)
                .setAttributes(tableCellDefaultStyle);

            // let myCheck = col1.appendListItem("yes");

            // myCheck.setGlyphType(DocumentApp.GlyphType.CHECKBOX);

            issueRow.appendTableCell(parseInt(myIssue.number).toFixed(0))
                .setBackgroundColor(rowColor)
                .getChild(0)
                .setAttributes(tableCellDefaultStyle);
            issueRow.appendTableCell(myIssue.month)
                .setBackgroundColor(rowColor)
                .getChild(0)
                .setAttributes(tableCellDefaultStyle);
            issueRow.appendTableCell(parseInt(myIssue.year).toFixed(0))
                .setBackgroundColor(rowColor)
                .getChild(0)
                .setAttributes(tableCellDefaultStyle);
            issueRow.appendTableCell(myIssue.grade)
                .setBackgroundColor(rowColor)
                .getChild(0)
                .setAttributes(tableCellDefaultStyle);
            issueRow.appendTableCell(usdFormatter.format(myIssue.online))
                .setBackgroundColor(rowColor)
                .getChild(0)
                .setAttributes(tableCellDefaultStyle);
            issueRow.appendTableCell(" ")
                .setBackgroundColor(rowColor)
                .getChild(0)
                .setAttributes(tableCellDefaultStyle);
        }

        docBody.appendPageBreak();
        
        // display.setValue("Done!");

        return true;

    } catch (error) {
        display.setValue ("Error making document: " + error);
        return false;
    }

}