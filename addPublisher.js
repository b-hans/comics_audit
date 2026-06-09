function addPublisher (params) {

    const display = params.display;

    try {

        display.setValue ("Adding publisher");
        return true;

    } catch (error) {
        display.setValue("Error adding publisher: " + error);
        return false;
    }
}