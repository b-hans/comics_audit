function clearCache() {
    var cache = CacheService.getScriptCache();

    const keysToRemove = [
        'current_search',
        'delete_issue_id',
        'current_title_id',
        'current_edit',
        'current_title',
        'current_title_edit',
        'current_row',
        'current_title_data',
        'edit_issue_row',
        'new_publisher',
        'delete_publisher',
        'publisher_edit',
        'edit_issue_data',
        'validate_status',
        'needed_status',
    ];

    cache.removeAll(keysToRemove);
}