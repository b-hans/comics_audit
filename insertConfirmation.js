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

    FORMSHEET.getRange(TE_CONFIRMATION).activate();

    return true;
}