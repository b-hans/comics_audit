function buildPublishers (params) {

    const cache = params.cache;

    try {

        const sheet = FORMSHEET;

        deleteFormsSheet();

        for (let i=0; i<PUB_NEW_RANGES.length; i++) {
            let item = PUB_NEW_RANGES[i];
            let tRange = sheet.getRange(item.a1notation);
            if (item.merge) {
                tRange.merge();
            }

            tRange.setBackground(item.background)
                .setFontFamily(item.font_family)
                .setFontColor(item.font_color)
                .setFontSize(item.font_size)
                .setHorizontalAlignment(item.horizontal)
                .setVerticalAlignment(item.vertical)
                .setValue(item.text);
        }

        for (let i=1; i<PUB_ROW_HEIGHTS.length-1; i++) {
            sheet.setRowHeight(i, PUB_ROW_HEIGHTS[i-1]);
        }

        for (let i=1; i<6; i++) {
            sheet.setColumnWidth(i, PUB_COL_WIDTHS);
        }

        ui.alert("Next check");
        return true;
    } catch (error) {
        ui.alert ("Error: " + error);
        return false;
    }
}