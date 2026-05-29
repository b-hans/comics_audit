function editComicTitle (params) {
    const ui = params.ui;
    const inputTitle = params.title;
    const display = params.display;

    try {

        const myTitle = getComicTitle({
            ui: ui,
            title: inputTitle
        });

        if (!myTitle.valid) {
            ui.alert("Not valid");
            return false;
        }

        const title = myTitle.title;
        const publisher = title.publisher.name;

        ui.alert ("Found: " + title.title + " vol." + title.volume + 
            " (" + publisher + ")"
        );

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