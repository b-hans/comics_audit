function insertConfirmation (params) {

    /**
     * Params
     * 
     * display
     * optionsRange could be null
     * text
     * options
     * 
     */

    const display = params.display;
    const optionsRange = params.optionsRange;

    if (optionsRange) {
        optionsRange.setValue ("Options");
    }

    display.setValue(params.text);

    displayYesNo({
        type: "TE",
        options: params.options
    });

    FORMSHEET.getRange(TE_CONFIRMATION).activate();

    return true;
}