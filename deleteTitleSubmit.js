function deleteTitleSubmit (params) {

    const display = params.display;
    const cache = params.cache;

    try {

        display.setValue ("Working....");

        const title_id = FORMSHEET.getRange(TE_ID_RANGE).getValue();
        cache.put("current_title_id", title_id, 3600);

        const confirmationText = "Confirmation required\nAre you sure?\nDelete title and all issues";

        return insertConfirmation({
            display: display,
            optionsRange:   null,
            text:           confirmationText,
            options:        ["Select one", "Yes, delete this title", "No"]
        });

        return true;

    } catch (error) {
        display.setValue ("Error deleting: " + error);
        return false;
    }

}