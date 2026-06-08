function submitEditTitle (params) {
    const display = params.display;
    const cache = params.cache;

    try {

        display.setValue ("Working....");

        const sheet = FORMSHEET;

        const publisher = sheet.getRange(TE_PUBLISHER_DROPDOWN_RANGE).getValue();
        let publisher_id = null;

        if (publisher && publisher != "Select one") {
            publisher_id = getPublisherFromDropdown({publisher: publisher, display: display});
        }

        const myTitle = {
            id:             sheet.getRange(TE_ID_RANGE).getValue(),
            title:          String(sheet.getRange(TE_TITLE_RANGE).getValue()),
            publisher_id:   publisher_id,
            volume:         sheet.getRange(TE_VOL_RANGE).getValue(),
            first:          sheet.getRange(TE_FIRST_RANGE).getValue(),
            last:           sheet.getRange(TE_LAST_RANGE).getValue()
        }

        let confirmationText = "Confirmation required\n\nDo the title edits?";

        if (isValidTitle({display: display, title: myTitle})) {
            cache.put('current_title_edit', JSON.stringify(myTitle), 3600);
            insertConfirmation({
                display:        display,
                optionsRange:   null,
                text:           confirmationText,
                options:        ['Select one', "Yes, submit title edits", "No"],
                type:           "TE"
            });
            return true;
        }
        else {
            cache.remove('current_title_edit');
            return false;
        }

    } catch (error) {
        display.setValue ("Error submitting title edit: " + error);
        return false;
    }
}