function validatePublisher (params) {
    const display = params.display;
    const publisher = params.publisher;
    const dropdown = params.dropdown;

    try {

        display.setValue ("Working....");

        let valid = true;
        let errors = "";
        let type = "new";
        const allPublishers = getPublisherData();
        const data = allPublishers.data;
        const headers = allPublishers.headers;


        if (dropdown != "Select a publisher") {
            type = "edit";
        }

        if (!publisher) {
            display.setValue ("Nothing to enter: " + type);
            return false;
        }

        switch (type) {
            case "new":
                let compare = publisher.toLowerCase();
                for (let i=0; i<data.length; i++) {
                    let item = data[i][headers.indexOf('Publisher')].toLowerCase();

                    if (item == compare) {
                        display.setValue ("That publisher exists already");
                        return false;
                    }

                }
                break;

            case "edit":
                break;
        }

        return true;

        // display.setValue ("In checks: " + publisher + " : " + type);
        // return false;
    } catch (error) {
        display.setValue ("Error in validating publisher: " + error);
        return false;
    }
}