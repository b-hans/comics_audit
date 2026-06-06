function getPublisherFromDropdown (params) {

    const publisher = params.publisher;
    const display = params.display;

    try {

        let idStartIndex = publisher.indexOf( " (" );
        if (idStartIndex != -1) {

            let pStart = idStartIndex + 2;
            let pEnd = publisher.indexOf(")");

            return publisher.substring(pStart, pEnd);
            
        }
        else {
            return null;
        }

    } catch (error) {
        display.setValue ("Error getting publisher_id: " + error);
        return null;
    }

}