function buildEditForm() {
    deleteFormsSheet();

    let range = FORMSHEET.getRange(TE_OUTERRANGE.a1notation)
        .setBackground(TE_OUTERRANGE.background)
        .setFontColor(TE_OUTERRANGE.color);

    range = FORMSHEET.getRange("A1").setValue(TE_TYPE);

    for (let i=0; i<TE_OUTERRANGE.rowheights.length; i++) {
        FORMSHEET.setRowHeight(i+1, TE_OUTERRANGE.rowheights[i]);
    }

    for (let i=0; i<TE_OUTERRANGE.colwidths.length; i++) {
        FORMSHEET.setColumnWidth(i+1, TE_OUTERRANGE.colwidths[i]);
    }

    FORMSHEET.getRange(TE_titleLabel.a1notation)
        .setBackground(TE_fontStyles.background)
        .setFontColor(TE_fontStyles.color)
        .setFontSize(TE_titleLabel.fontSize)
        .setFontFamily(TE_fontStyles.fontFamily)
        .setHorizontalAlignment(TE_titleLabel.horizontal)
        .setVerticalAlignment(TE_fontStyles.vertical)
        .setValue(TE_titleLabel.value);

    FORMSHEET.getRange(TE_titleInput.a1notation)
        .setBackground(TE_fontStyles.background)
        .setFontColor(TE_fontStyles.color)
        .setFontSize(TE_titleInput.fontSize)
        .setFontFamily(TE_fontStyles.fontFamily)
        .setHorizontalAlignment(TE_titleInput.horizontal)
        .setVerticalAlignment(TE_fontStyles.vertical)
        .merge();

    return true;

}