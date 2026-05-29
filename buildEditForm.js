function buildEditForm() {
    deleteFormsSheet();

    let range = FORMSHEET.getRange(TE_OUTERRANGE.a1notation)
        .setBackground(TE_OUTERRANGE.background)
        .setFontColor(TE_OUTERRANGE.color);

    range = FORMSHEET.getRange("A1").setValue(TE_TYPE);

    return true;

}