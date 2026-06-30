function titleEditMenu (params) {

    const menuA1 = "E6";
    const defaultMenu = "Functions";
    const display = getDisplay("TE");
    const cache = CacheService.getScriptCache();

    try {

        const range = params.range;
        const rowIndex = range.getRow();
        const menuValue = range.getValue();
        const rangeColumn = range.getColumn();
        const rangeRow = range.getRow();

        // confirmation menu range
        if (range.getA1Notation() == TE_CONFIRMATION && menuValue != "Select") {
            let current_row = TE_issue_start_row;
            if (cache.get('current_row')) {
                current_row = cache.get('current_row');
            }

            if (menuValue == "No") {
                clearSelect("TE");
            }
            else if (menuValue == "Yes, update all issues") {
                clearSelect('TE');
                return updateAllIssues({display: display, cache: cache});         
            }
            else if (menuValue == "Yes, submit title edits") {
                clearSelect("TE");
                return editTitle({cache: cache, display: display});
            }
            else if (menuValue == "Yes, delete this title") {
                clearSelect("TE");
                return deleteTitle({display: display, cache: cache});
            }
            else if (menuValue == "Yes, enter the title") {
                clearSelect("TE");
                display.setValue ("Working....");
                return enterTitle({display: display, cache: cache});
            }
            else if (menuValue == "Yes, edit it") {
                clearSelect("TE");
                display.setValue ("Working");
                let editRow = cache.get('edit_issue_row');
                if (editIssue({
                    cache:          cache,
                    display:        display,
                    row:            editRow,
                    optionsColumn:  1,
                    optionsText:    "Options",
                })) {
                    display.setValue("Edit done!");
                    cache.remove("edit_issue_id");
                    FORMSHEET.getRange(editRow, 1)
                        .activate();
                };
            }
            else if (menuValue == "Cancel insert issue") {
                rebuildFunctionsDropdown('edit');
                cancelNewIssue();
            }
            else if (menuValue == "Yes, insert") {
                insertIssue();
            }
            else if (menuValue == "Yes, submit issues") {
                clearSelect("TE");
                return newIssues({display: display, cache: cache});
            }
            else if (menuValue == "Yes, delete it") {
                clearSelect("TE");
                display.setValue("Working....");
                if(deleteIssue({
                    display: display,
                    id: cache.get("delete_issue_id")
                })) {
                    cache.remove("delete_issue_id");                    
                }
                else {
                    cache.remove("delete_issue_id");
                    display.setValue (display.getValue() + "\nProblem deleting issue");
                }
            }
            else {
                cache.remove("delete_issue_id");
            }

            FORMSHEET.getRange(current_row, 1).activate();

            return true;
        }
        // issue option menu range
        else if (rangeColumn == 1 && menuValue && menuValue != "Options") {
            cache.put("current_row", rangeRow, 3600);
            if (menuValue == "Edit") {

                display.setValue ("Working....");

                if (issueValid ({
                    cache: cache,
                    display: display, 
                    optionsRow: rowIndex,
                    optionsColumn: 1,
                    optionsText: "Options"
                })) {

                    cache.put ("edit_issue_row", rowIndex, 3600);

                    let confirmationText = "Confirmation required\nDo the edits?"

                    return insertConfirmation ({
                        display:        display,
                        optionsRange:   FORMSHEET.getRange(rowIndex, 1),
                        text:           confirmationText,
                        options:        ["Options", "Yes, edit it", "No"],
                        type:           "TE",
                    });
                }
            }
            else if (menuValue == "Delete") {
                return deleteIssueConfirmation(rangeRow);
            }
            else if (menuValue == "Insert it") {

                let params = {
                    display:    display,
                    options:    FORMSHEET.getRange(TE_issue_start_row, 1, 1, 1),
                    text:       "Options"
                }

                if (newIssueValid(params)) {
                    return insertConfirmation({
                        text:           "Confirmation required\n\nAdd this issue?",
                        display:        display,
                        optionsRange:   FORMSHEET.getRange(TE_issue_start_row, 1, 1, 1),
                        options:        ['Select', "Yes, insert", "No"],
                        type:           "TE",
                    });                
                }
                else {
                    return true;
                }
            }
            else if (menuValue == "Cancel insert") {

                return insertConfirmation({
                    text:           "Confirmation required\n\nDo you wish to cancel?",
                    display:        display,
                    optionsRange:   FORMSHEET.getRange(TE_issue_start_row, 1, 1, 1),
                    options:        ['Select', "Cancel insert issue", "No"],
                    type:           "TE",
                });

            }
            else {
                display.setValue(menuValue);
                return true;
            }
        }
        
        if (range.getA1Notation() != menuA1 ||
            menuValue == "Functions") {
                return true;
        }

        range.setValue(defaultMenu);

        // function menu range
        switch (menuValue) {

            case "Submit issue edits":

                let validateStatus = validateAllIssueEdits({display: display, cache: cache});

                if (!validateStatus.changes) {
                    display.setValue ("No issues to edit");
                    return true;
                }

                cache.put('validate_status', JSON.stringify(validateStatus), 3600);

                if (validateStatus.valid) {
                    return insertConfirmation({
                        display:        display,
                        optionsRange:   null,
                        text:           'Confirmation required\nUpdate all the issues?',
                        options:        ['Select one', 'Yes, update all issues', 'No'],
                        type:           'TE'
                    });
                }
                else {
                    return false;
                }
                break;

            case "Cancel":
                cache.remove('current_issue');
                return rebuildTitleSearchForm();

            case "Submit edit title":
                // editTitle
                return submitEditTitle({display: display, cache: cache});

            case "Submit new title":
                return submitNewTitle({display: display, cache: cache});

            case "Add issue":
                return addIssue();

            case "Delete this title":
                return deleteTitleSubmit({display: display, cache: cache});

            case "Show needed issues":
                return needed({display: display, cache: cache, type: "show"});

            case "Show my issues":
                return needed({display: display, cache: cache, type: "hide"});

            case "Submit new issues":
                return insertConfirmation({
                    text:       "Confirmation required\n\nSubmit these issues?",
                    display:    display,
                    type:       "TE",
                    options:    ['Select', 'Yes, submit issues', 'No']
                });

            default:
                display.setValue ("menu: " + menuValue);
        }
        

        return true;
    } catch (error) {
        display.setValue ("Problem: " + error);
        return false;
    }
}