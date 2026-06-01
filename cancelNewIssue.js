function cancelNewIssue() {

    const display = getDisplay("TE");

    try {

        FORMSHEET.deleteRow(TE_issue_start_row);
        clearSelect("TE");

        display.setValue ("New issue canceled");

        return true;

    } catch (error) {
        display.setValue ("Error: " + error);
        return false;
    }

}