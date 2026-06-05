function submitEditTitle (params) {
    const display = params.display;
    const cache = params.cache;

    try {

        display.setValue ("Working....");

        const sheet = FORMSHEET;

        const myTitle = {
            id:         sheet.getRange(TE_ID_RANGE).getValue(),
            title:      String(sheet.getRange(TE_TITLE_RANGE).getValue()),
            publisher:  null,
            volume:     sheet.getRange(TE_VOL_RANGE).getValue(),
            first:      sheet.getRange(TE_FIRST_RANGE),
            last:       sheet.getRange(TE_LAST_RANGE)
        }

        console.log (myTitle);

        display.setValue ("zIn submit title edit");

        return false;
    } catch (error) {
        display.setValue ("Error submitting title edit: " + error);
        return false;
    }
}