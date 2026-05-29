// globals here

const FORMSHEET = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Forms");

const MENUCELL = "C3";
const DISPLAYCELL = "C8";
const OPTIONSCELL = "D6";
const TITLESEARCHCELL = "C6";

const MENUDEFAULT = "Select one";
const TITLEDEFAULT = "Enter title here";

const AUDITFOLDER = "1iBZzYLkgROW1nNatYuebA5n9bxJP938o";

const STARTING_ID = 113;

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const GRADINGDATA = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName('Grading ID')
    .getDataRange()
    .getValues();

const GRADINGHEADERS = GRADINGDATA.shift();


const OUTERRANGE = {
    a1notation: "A1:G27",
    color: "#f3f3f3",
    rowstart: 1,
    numrows: 27,
    rowheight:20,
    colwidths: [100, 100, 166, 100, 100, 100, 100]
}

const INNERRANGE = {
    a1notation: "B2:F26",
    background: "#cfe2f3",
    borders: [true, true, true, true, false, false],
    borderstyle: SpreadsheetApp.BorderStyle.SOLID_THICK,
    bordercolor: "#999999"

}

const MENU = {
    a1notation: "C3:C4",
    background: "white",
    options: ['Select one', 'Title search form', 'Title add form', 'Audit form', 'Create one'],
    horizontal: 'center',
    vertical: 'middle',
    borders: [true, true, true, true, false, false],
    borderstyle: SpreadsheetApp.BorderStyle.SOLID,
    bordercolor: "black"

}

const DISPLAY = {
    a1notation: "C8:E24",
    background: "#f3f3f3",
    borders: [true, true, true, true, false, false],
    borderstyle: SpreadsheetApp.BorderStyle.DOUBLE,
    bordercolor: "black",
    horizontal: 'left',
    vertical: 'top'
}

const TITLEENTER = {
    a1notation: "C6",
    background: "white",
    borders: [true, true, true, true, false, false],
    borderstyle: SpreadsheetApp.BorderStyle.SOLID,
    bordercolor: "black",
    horizontal: "center",
    vertical: 'middle'
}

const MENUOPTIONS = {
    a1notation: "D6",
    background: "white",
    horizontal: "center",
    vertical: 'middle',
    options: ['Options', 'Search title'],
}
