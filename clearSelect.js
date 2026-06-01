function clearSelect (type) {

    let yesNoRange;
    const display = getDisplay(type);

    switch (type) {
        case ("TE"):
            yesNoRange = FORMSHEET.getRange(TE_CONFIRMATION);
            break;
    }

    // clear the select
    yesNoRange.clearDataValidations()
        .clearContent()
        .setBackground("#f3f3f3")
        .setFontColor("#f3f3f3");


    display.setValue("");

    return true;



}