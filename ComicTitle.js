class ComicTitle {
    constructor (params) {

        let title = "";
        let id = -1;

        this.valid = true;
        this.multiple = false;

        if (params.title) {
            title = params.title;
        }
        else if (params.id !== null) {
            id = params.id;
        }
        else {
            this.valid = false;
            return;
        }

        let display = FORMSHEET.getRange(DISPLAYCELL);

        const TITLEDATA = SpreadsheetApp
            .getActiveSpreadsheet()
            .getSheetByName("Title table")
            .getDataRange()
            .getValues();

        const HEADERS = TITLEDATA.shift();

        try {

            let titleIndex = HEADERS.indexOf("Title");
            let idIndex = HEADERS.indexOf("id");
            let filteredResult = [];

            if (title) {
                filteredResult = TITLEDATA.filter (item => {
                    if (String(item[titleIndex]).toLowerCase() === title.toLowerCase()) {
                        return true;
                    }
                    else {
                        return false;
                    }
                });
                if (filteredResult.length < 1) {
                    this.valid = false;
                    return;
                }
                else if (filteredResult.length > 1) {
                    this.multiple = true;
                    this.valid = false;
                    return;
                }
            }
            else if (id != -1) {
                filteredResult = TITLEDATA.filter (item => item[idIndex] == id);
                if (filteredResult.length < 1) {
                    this.valid = false;
                    return;
                }
            }
            else {
                this.valid = false;
                return;
            }

            let myTitle = filteredResult[0];

            this.title = myTitle[titleIndex];
            this.id = myTitle[idIndex];
            this.publisher_id = myTitle[HEADERS.indexOf('publisher_id')];
            this.volume = myTitle[HEADERS.indexOf('Volume')];
            this.num_first = myTitle[HEADERS.indexOf('Title first#')];
            this.num_last = myTitle[HEADERS.indexOf('Title last#')];

            this.publisher = new ComicPublisher({id: this.publisher_id});

            // filter for the issues

            const issueData = SpreadsheetApp.getActiveSpreadsheet()
                .getSheetByName("MyComics")
                .getDataRange()
                .getValues();

            const issueHeaders = issueData.shift();
            const numIndex = issueHeaders.indexOf("Number");

            let filteredIssues = issueData.filter (
                item => item[issueHeaders.indexOf('title_id')] === this.id
            );

            filteredIssues.sort ((a, b) => {
                if (a[numIndex] == b[numIndex]) {
                    return 0;
                }
                else if (a[numIndex] < b[numIndex]) {
                    return -1;
                }
                else {
                    return 1;
                }
            });

            let issueList = "";
            this.issues = []
            for (let i=0; i<filteredIssues.length; i++) {
                this.issues.push(new ComicIssue(
                    {
                        row: filteredIssues[i],
                        headers: issueHeaders
                    }
                ));
            }

            return;
        } catch (error) {
            display.setValue ("Error: " + error);
            this.valid = false;
            return;
        }
    }

}