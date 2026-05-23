function searchTitle () {

    const display = FORMSHEET.getRange(DISPLAYCELL);
    const searchTitle = FORMSHEET.getRange(TITLESEARCHCELL).getValue();

    try {

        if (!searchTitle || searchTitle == "Enter title here") {
            display.setValue ("You need to enter a title to search");
            return false;
        }

        FORMSHEET.getRange(TITLESEARCHCELL).setValue (TITLEDEFAULT);

        let searcher = new ComicTitle(searchTitle);

        // display.setValue(display.getValue() + "\nSearcher: " + searcher.title);

        return true;
    } catch (error) {
        display.setValue("Error: " + error);
        return false;
    }


}