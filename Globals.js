// globals here

const FORMSHEET = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Forms");

const MENUCELL = "C3";
const DISPLAYCELL = "C6";

const MENUDEFAULT = "Select one";

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
    borderstyle: SpreadsheetApp.BorderStyle.SOLID_THICK,
    bordercolor: "#999999"

}

// const MENUMERGE;
// const DISPLAYMERGE;
