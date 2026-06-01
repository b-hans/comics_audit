function getDisplay (type) {

    switch (type) {
        case "TE":
            return FORMSHEET.getRange(TE_DISPLAY);

        default:
            return false;
    }
    
}