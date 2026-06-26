function needs (params) {

    const type = params.type;
    const display = params.display;

    try {
        display.setValue ("Needs: " + type);
        return true;
    } catch (error) {
        display.setValue ("Error with needs: " + error);
        return false;
    }

}