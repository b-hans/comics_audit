function validatePublisher (params) {
    const display = params.display;
    const publisher = params.publisher;
    const dropdown = params.dropdown;

    try {

        let valid = true;
        let errors = "";
        let type = "new";

        if (dropdown != "Select a publisher") {
            type = "edit";
        }

        if (!publisher) {
            display.setValue ("Nothing to enter: " + type);
            return false;
        }

        

        // if (!valid) {
        //     display.setValue (errors);
        //     return false;
        // }

        display.setValue ("In checks: " + publisher + " : " + type);
        return false;
    } catch (error) {
        display.setValue ("Error in validating publisher: " + error);
        return false;
    }
}