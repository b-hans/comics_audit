function submitNewTitle (params) {

    const display = params.display;
    const cache = params.cache;

    try {

        const title = {};
        const sheet = FORMSHEET;

        display.setValue ("Working...");

        title.id = -1;
        title.title = String(sheet.getRange(TE_TITLE_RANGE).getValue());
        title.volume = sheet.getRange(TE_VOL_RANGE).getValue();
        title.first = sheet.getRange(TE_FIRST_RANGE).getValue();
        title.last = sheet.getRange(TE_LAST_RANGE).getValue();
        title.publisher = sheet.getRange(TE_PUBLISHER_DROPDOWN_RANGE).getValue();

        console.log (title);

        display.setValue('check console');

        return true;
    } catch (error) {
        display.setValue("Error submitting new title: " + error);
        return false;
    }


}