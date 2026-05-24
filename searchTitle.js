function searchTitle () {

    const display = FORMSHEET.getRange(DISPLAYCELL);
    const searchTitle = FORMSHEET.getRange(TITLESEARCHCELL).getValue();

    try {

        if (!searchTitle || searchTitle == "Enter title here") {
            display.setValue ("You need to enter a title to search");
            return false;
        }

        FORMSHEET.getRange(TITLESEARCHCELL).setValue (TITLEDEFAULT);

        let searcher = new ComicTitle({
            title: searchTitle,
            id: null
        });

        if (searcher.valid) {
            display.setValue (// display.getValue() + "\n\n" + 
                "Title: " + searcher.title + "\n" +
                "publisher: " + searcher.publisher.name + "\n" +
                "Volume: " + searcher.volume + "\n" +
                "First#: " + searcher.num_first + "\n" +
                "Last#: " + searcher.num_last
            );
        }
        else if (searcher.multiple) {
            display.setValue ("Multiple titles: " + searchTitle);
        }
        else {
            display.setValue ("Not found: " + searchTitle);
        }

        return true;
    } catch (error) {
        display.setValue("Error: " + error);
        return false;
    }


}