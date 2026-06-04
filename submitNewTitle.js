function submitNewTitle (params) {

    const display = params.display;
    const cache = params.cache;

    try {

        const title = {};
        const sheet = FORMSHEET;
        let publisher;

        display.setValue ("Working...");

        title.id = -1;
        title.title = String(sheet.getRange(TE_TITLE_RANGE).getValue());
        title.volume = sheet.getRange(TE_VOL_RANGE).getValue();
        title.first = sheet.getRange(TE_FIRST_RANGE).getValue();
        title.last = sheet.getRange(TE_LAST_RANGE).getValue();

        if (publisher = sheet.getRange(TE_PUBLISHER_DROPDOWN_RANGE).getValue()) {

            let idStartIndex = publisher.indexOf( " (" );
            if (idStartIndex != -1) {

                let pStart = idStartIndex + 2;
                let pEnd = publisher.indexOf(")");

                title.publisher_id = publisher.substring(pStart, pEnd);
                
            }
            else {
                title.publisher_id = null;
            }

        }
        else {
            title.publisher_id = null;
        }

        if (isValidTitle ({display: display, title: title})) {            
            // put title in cache
            cache.put("current_title", JSON.stringify(title), 3600);
            return insertConfirmation({
                display:        display,
                optionsRange:   null,
                text:           "Confirmation required\nEnter this title?",
                options:        ["Select one", "Yes, enter the title", "No"]
            });
        }
        else {
            return false;
        }

    } catch (error) {
        display.setValue("Error submitting new title: " + error);
        return false;
    }


}