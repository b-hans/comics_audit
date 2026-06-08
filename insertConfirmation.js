function insertConfirmation (params) {

    /**
     * Params
     * 
     * display
     * optionsRange could be null
     * text
     * options
     * type: "TE" or "PUB"
     * 
     */

    const display = params.display;
    const optionsRange = params.optionsRange;
    const type = params.type;

    if (optionsRange) {
        optionsRange.setValue ("Options");
    }

    display.setValue(params.text);

    displayYesNo({
        type: type,
        options: params.options
    });

    let conRange;
    if (type == "TE") {
        conRange = FORMSHEET.getRange(TE_CONFIRMATION);
    }
    else if (type == "PUB") {
        conRange = FORMSHEET.getRange(PUB_CONFIRMATION_RANGE);
    }
    conRange.activate();

    return true;
}