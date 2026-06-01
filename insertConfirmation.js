function insertConfirmation (params) {
    const display = params.display;
    const optionsRange = params.optionsRange;

    optionsRange.setValue ("Options");

    display.setValue(params.text);

    displayYesNo({
        type: "TE",
        options: params.options
    });

    return true;
}