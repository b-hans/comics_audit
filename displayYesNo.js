function displayYesNo(params) {

    const type = params.type;
    const options = params.options;

    let yesNo;
    
    switch (type) {
        case "TE":
            yesNo = FORMSHEET.getRange(TE_CONFIRMATION);
            break;

        case "PUB":
            yesNo = FORMSHEET.getRange(PUB_CONFIRMATION_RANGE);
            break;
    }
    
    yesNo.clearDataValidations()
        .clearContent();

    const yesNoRule = SpreadsheetApp.newDataValidation()
        .requireValueInList(options, true)
        .setAllowInvalid(false)
        .build();

    SpreadsheetApp.flush();
    yesNo.setDataValidation(yesNoRule);

    yesNo.setBackground("#f4cccc")
        .setFontColor("black")
        .setHorizontalAlignment("center")
        .setVerticalAlignment("middle");

    yesNo.setValue(options[0]);

    return true;

}