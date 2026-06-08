function publisherMenu (params) {

    const range = params.range;
    const sheet = FORMSHEET;
    const display = sheet.getRange(PUB_DISPLAY_RANGE);
    const menuType = range.getValue();
    const a1Notation = range.getA1Notation();

    try {

        if (a1Notation != PUB_FUNCTIONS_RANGE  && a1Notation != PUB_CONFIRMATION_RANGE) {
            if (menuType == PUB_FUNCTIONS_OPTIONS[0] || menuType == "Select one") {
                return true;
            }
        }

        switch (menuType) {
            case "Cancel":
                const confirmationText = "Confirmation required\n\nCancel?";
                return insertConfirmation({
                    display:        display,
                    optionsRange:   sheet.getRange(PUB_FUNCTIONS_RANGE),
                    type:           "PUB",
                    text:           confirmationText,
                    options:        ['Select one', "Yes, cancel publishers", "No"]
                });
                // return rebuildTitleSearchForm();

            case "Yes, cancel publishers":
                clearCache();
                return rebuildTitleSearchForm();

            case "No":
                clearSelect("PUB");
                display.activate();
                break;

            default:
                display.setValue ("Default: " + menuType)
                return true;
        }

    } catch (error) {
        display.setValue ("Error: " + error);
        return false;
    }

}