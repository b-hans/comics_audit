function editComicTitle (params) {
    const ui = params.ui;
    const inputTitle = params.title;
    const display = params.display;

    try {

        const myTitle = getComicTitle({
            ui: ui,
            title: inputTitle
        });

        if (!myTitle.valid) {
            ui.alert("Not valid");
            return false;
        }

        const title = myTitle.title;
        const publisher = title.publisher.name;

        // ui.alert ("Found: " + title.title + " vol." + title.volume + 
        //     " (" + publisher + ")"
        // );

        let testSheet = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName("Copy of Forms");
        

        if (!buildEditForm()) {
            ui.alert("Problem");
            return false;
        }

        FORMSHEET.getRange(TE_titleInput.a1notation)
            .setValue(title.title);

        return true;
    } catch (error) {
        display.setValue ("Error getting title edit: " + error);
        return false;
    }
}