function getDisplay (type) {

    switch (type) {
        case "TE":
            return FORMSHEET.getRange(TE_DISPLAY);

        case "PUB":
            return FORMSHEET.getRange(PUB_DISPLAY_RANGE);

        default:
            return false;
    }
    
}