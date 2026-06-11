function updateAllIssues(params) {
    const display = params.display;
    const cache = params.cache;

    try {

        const changes = JSON.parse(cache.get('validate_status'));

        console.log ("test1", changes);

        display.setValue ("Doing it39");

        return true;
    } catch (error) {
        display.setValue ("Error updating all issues: " + error);
        return false;
    }
}