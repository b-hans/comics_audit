function showTitlesMenu (params) {

    const display = params.display;

    try {


        range = FORMSHEET.getRange(TS_CURRENT_TITLES_LABEL)
                    .setBackground("#cfe2f3")
                    .setFontColor("#7A367A")
                    .setHorizontalAlignment("right")
                    .setVerticalAlignment("middle")
                    .setFontFamily("Comic Sans MS")
                    .setFontSize(10)
                    .setValue("Titles: ");

        let titlesRange = FORMSHEET.getRange(TS_CURRENT_TITLES)
                    .setBackground("#ffffff")
                    .merge()
                    .setFontColor("black")
                    .setHorizontalAlignment("center")
                    .setVerticalAlignment("middle")
                    .setBorder(true, true, true, true, false, false,
                        "black", SpreadsheetApp.BorderStyle.SOLID
                    );

        return true;
    }
    catch (error) {
        display.setValue ("Problem getting titles: " + error);
        return false;
    }
}