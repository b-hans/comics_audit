function createAll () {
    const display = FORMSHEET.getRange(DISPLAYCELL);

    try {

        display.setValue("Working....");

        let titlesData = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName("Title table")
            .getDataRange()
            .getValues();

        let headers = titlesData.shift();

        for (let i=0; i<titlesData.length; i++) {
            let myTitle = new ComicTitle({
                id: titlesData[i][headers.indexOf('id')],
                title: null,
            });

            createTitleDocument(myTitle);
        }

        display.setValue ("Done!");

        return true;

    } catch (error) {
        display.setValue ("Error creating all: " + error);
        return false;
    }
}