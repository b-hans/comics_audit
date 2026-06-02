function redrawCurrentEdit (params) {

    const display = params.display;

    try {

        const title_id = FORMSHEET.getRange(TE_ID_RANGE).getValue();
        const title = new ComicTitle({
            id: title_id,
            title: null,
        });

        return editComicTitle({
            display: display,
            title: title.edit_dropdown,
        });

    } catch (error) {
        display.setValue ("Error redrawing edit: " + error);
        return false;
    }

}