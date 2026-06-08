function clearSelect (type) {

    let yesNoRange;
    const display = getDisplay(type);
    let backgroundColor;

    switch (type) {
        case ("TE"):
            yesNoRange = FORMSHEET.getRange(TE_CONFIRMATION);
            backgroundColor = "#fefefe";
            break;

        case ("PUB"):
            yesNoRange = FORMSHEET.getRange(PUB_CONFIRMATION_RANGE);
            backgroundColor = LIGHT_ORANGE_3;
            break;
    }

    // clear the select
    yesNoRange.clearDataValidations()
        .clearContent()
        .setBackground(backgroundColor)
        .setFontColor(backgroundColor);


    display.setValue("");

    return true;



}