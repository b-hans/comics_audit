function getComicTitle (params) {

    const ui = params.ui;
    const title = params.title;

    try {
    
        // search for the vol.
        let vol = "";
        let publisher_id = "";
        let comicTitle = "";

        let volIndex = title.indexOf("vol.");

        if (volIndex != -1){
            let vStart = volIndex + 4;
            let vEnd = title.indexOf(' ', vStart);

            vol = title.substring(vStart, vEnd);
        }

        ui.alert ("Volume: " + vol);

        return {
            valid: true,
        }

    } catch (error) {
        ui.alert ("error: " + error);
        return { valid: false }
    }
}