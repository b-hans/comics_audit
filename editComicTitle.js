function editComicTitle (params) {
    const ui = params.ui;
    const title = params.title;
    const display = params.display;

    try {

        const comicTitle = getComicTitle({
            ui: ui,
            title: title
        });

        if (!comicTitle.valid) {
            return false;
        }

        // if (buildEditForm()) {
        //     ui.alert("in build");
        // }
        // else {
        //     ui.alert ("Problem");
        //     return false;
        // }

        return true;
    } catch (error) {
        display.setValue ("Error getting title edit: " + error);
        return false;
    }
}