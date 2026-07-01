function clearCache() {
    var cache = CacheService.getScriptCache();

    const keysToRemove = [
        'current_search',
        'delete_issue_id',
        'current_title_id',
        'current_edit',
        'current_title',
        'current_title_edit',
        'current_issues',
        'current_row',
        'edit_issue_row',
        'new_publisher',
        'delete_publisher',
        'publisher_edit',
        'edit_issue_data',
        'validate_status',
        'newIssues'
    ];

    cache.removeAll(keysToRemove);
}