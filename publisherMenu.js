function publisherMenu (params) {

    const range = params.range;
    const sheet = FORMSHEET;
    const display = sheet.getRange(PUB_DISPLAY_RANGE);
    const menuType = range.getValue();
    const a1Notation = range.getA1Notation();

    try {

        if (a1Notation != PUB_FUNCTIONS_RANGE || menuType == PUB_FUNCTIONS_OPTIONS[0]) {
            return true;
        }

        switch (menuType) {
            case "Cancel":
                return rebuildTitleSearchForm();

            default:
                display.setValue ("Default: " + menuType)
                return true;
        }

    } catch (error) {
        display.setValue ("Error: " + error);
        return false;
    }

}