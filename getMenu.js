function getMenu(e) {

    const statusCell = FORMSHEET.getRange(DISPLAYCELL);

    statusCell.setValue("Initialized");

    SpreadsheetApp.getUi()
         .createMenu('Form rebuilds')
         .addItem('Rebuild input form', 'rebuildInputForm')
         .addItem('Create all', 'createAll')
         .addToUi();
    
}