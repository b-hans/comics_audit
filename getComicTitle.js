function getComicTitle (params) {

    const ui = params.ui;
    const title = params.title;

    try {
    
        // search for the vol.
        let titleId = "";

        let idIndex = title.indexOf(" [[");

        if (idIndex != -1){
            let vStart = idIndex + 3;
            let vEnd = title.indexOf(']]', vStart);

            titleId = title.substring(vStart, vEnd);
        }

        const myTitle = new ComicTitle({
            id: titleId,
            title: null
        });

        if (!myTitle.valid) {
            return { valid: false }
        }

        return {
            valid: true,
            title: myTitle
        }

    } catch (error) {
        ui.alert ("error: " + error);
        return { valid: false }
    }
}