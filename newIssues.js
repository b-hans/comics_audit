function newIssues (params) {

    const display = params.display;
    const cache = params.cache;

    try {

        display.setValue ("Insert issues");
        return true;
    } catch (error) {
        display.setValue ("Error inserting issues: " + error);
        return false;
    }
}