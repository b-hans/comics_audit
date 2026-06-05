function isValidTitle(params) {
    const display = params.display;
    const title = params.title;

    try {

        let isValid = true;
        let errors = "";

        let validType;

        if (!title.id || title.id < 1) {
            validType = "new";
        }
        else {
            validType = "edit";
        }

        display.setValue ("type: " + validType);
        return false;


        if (!title.title) {
            isValid = false;
            errors += "Title is required\n";
        }

        if (!title.publisher_id) {
            isValid = false;
            errors += "Publisher is required\n";
        }

        if (title.volume && isNaN(title.volume)) {
            isValid = false;
            errors += "Volume must be a number\n";
        }

        if (title.first && isNaN(title.first)) {
            isValid = false;
            errors += "First# must be a number\n";
        }

        if (title.last && isNaN(title.last)) {
            isValid = false;
            errors += "Last# must be a number\n";
        }

        if (!isValid) {
            display.setValue ("You have errors\n" + errors);
            return isValid;
        }
        else if (existsTitle({display: display, title: title})) {

            display.setValue ("Error\nThis title exists already");

            return false;
        }
        else {
            return true;
        }


    } catch (error) {
        display.setValue ("Error validating title: " + error);
        return false;
    }
}