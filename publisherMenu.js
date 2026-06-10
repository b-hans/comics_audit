function publisherMenu (params) {

    const range = params.range;
    const sheet = FORMSHEET;
    const display = sheet.getRange(PUB_DISPLAY_RANGE);
    const menuType = range.getValue();
    const a1Notation = range.getA1Notation();
    const functionsRange = sheet.getRange(PUB_FUNCTIONS_RANGE);
    const dropdownRange = sheet.getRange(PUB_PUBLISHERS_DROPDOWN_RANGE);
    const pubRange = sheet.getRange(PUB_SEARCH_RANGE);
    const cache = params.cache;

    try {
        

        if (a1Notation != PUB_FUNCTIONS_RANGE  && 
            a1Notation != PUB_CONFIRMATION_RANGE &&
            a1Notation != PUB_PUBLISHERS_DROPDOWN_RANGE) {
                return true;
        }
        else if (a1Notation == PUB_PUBLISHERS_DROPDOWN_RANGE){
            if (menuType != "Select a publisher") {
                pubRange.setValue(menuType);
                display.setValue("");
                rebuildPubFunctions({display: display, type: "edit"});
            }
            else {
                pubRange.setValue("");
                display.setValue ("");
                rebuildPubFunctions({display: display, type: "new"});
            }
            return true;
        }
        else if (menuType == PUB_FUNCTIONS_OPTIONS[0] || menuType == "Select one") {
            return true;
        }


        switch (menuType) {
            case "Yes, delete this publisher":
                clearSelect('PUB');
                return deletePublisher({display: display, cache: cache});

            case "Delete publisher":
                functionsRange.setValue(PUB_FUNCTIONS_OPTIONS[0]);

                if (validateDeletePublisher({display: display, cache: cache})) {
                    return insertConfirmation({
                        display: display,
                        optionsRange:   null,
                        text:           "Confirmation required\nDelete the publisher?",
                        options:        ["Select one", 'Yes, delete this publisher', 'No'],
                        type:           'PUB'
                    })
                }
                else {
                    return false;
                }
                

            case "Yes, add publisher":
                clearSelect("PUB");
                return addPublisher({display: display, cache: cache})

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

            case "Submit new publisher":
                functionsRange.setValue(PUB_FUNCTIONS_OPTIONS[0]);
                const newPublisher = sheet.getRange(PUB_SEARCH_RANGE).getValue();
                cache.put("new_publisher", newPublisher, 3600);
                if (validatePublisher({
                    publisher:  newPublisher, 
                    display:    display, 
                    dropdown:   dropdownRange.getValue()
                })) {
                    return insertConfirmation({
                        display:        display,
                        optionsRange:   null,
                        text:           "Confirmation required\n\nAdd new publisher?",
                        options:        ['Select one', 'Yes, add publisher', 'No'],
                        type:           "PUB"
                    });
                }
                else {
                    return false;
                }

            default:
                functionsRange.setValue(PUB_FUNCTIONS_OPTIONS[0]);
                display.setValue ("Default: " + menuType)
                return true;
        }

    } catch (error) {
        display.setValue ("Error: " + error);
        return false;
    }

}