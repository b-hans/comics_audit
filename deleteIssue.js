function deleteIssue (rangeRow) {

    const display = getDisplay("TE");
    const cache = CacheService.getScriptCache();

    try {

        const idCol = 9;
        const optionsCol = 1;

        let issueRange = FORMSHEET.getRange(rangeRow, 1, 1, 9).getValues()[0];

        const issue_id = issueRange[8];
        cache.put("delete_issue_id", issue_id, 3600);

        FORMSHEET.getRange(rangeRow, optionsCol, 1, 1).setValue ("Options");
        
        let params = {
            text:       "Confirmation required\nDelete issue?",
            type:       "Te",
            display:    display,
            options:    ["Select", "Yes, delete it", "No"],
            optionsRange:   FORMSHEET.getRange(rangeRow, 1, 1, 1),
        }

        return insertConfirmation (params);

    } catch (error) {
        display.setValue ("Error: " + error);
        return false;
    }


}