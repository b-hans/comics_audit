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
            display.setValue ("Publisher field cannot be empty");
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
                if (publisher == dropdown) {
                    display.setValue("No changes to make");
                    return false;
                }

                // check to see if new edited doesn't match something else
                let currentPublisher = new ComicPublisher({
                    id:         null,
                    publisher:  dropdown
                });

                let allPublishers = getPublisherData();

                let data = allPublishers.data;
                let headers = allPublishers.headers;

                for (let i=0; i<data.length; i++) {
                    item = data[i];

                    if (item[headers.indexOf('Publisher')] == publisher &&
                        item[headers.indexOf('id')] != currentPublisher.id) {
                            display.setValue ("That publisher name exists already");
                            return false;
                    }
                }

        }

        return true;

        // display.setValue ("In checks: " + publisher + " : " + type);
        // return false;
    } catch (error) {
        display.setValue ("Error in validating publisher: " + error);
        return false;
    }
}