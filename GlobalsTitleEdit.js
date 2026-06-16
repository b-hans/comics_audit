const TE_BACK_RANGE = "A1:G27";
const TE_TYPE = "titleedit";

const TE_PUBLISHER_DROPDOWN_RANGE = "C4";
const TE_TITLE_RANGE = "C2";
const TE_VOL_RANGE = "C6";
const TE_FIRST_RANGE = "C8";
const TE_LAST_RANGE = "C10";
const TE_issue_start_row = 15;
const TE_issue_id_column = 9;
const TE_ID_RANGE = "F12";
const TE_DISPLAY = "G2";
const TE_CONFIRMATION = "H4";
const TE_ISSUE_ID_COLUMN = 8;
const TE_FUNCTIONS_RANGE = "E6";

const TE_OUTERRANGE = {
    a1notation: "A1:I17",
    color: "#f3f3f3",
    background: "#f3f3f3",
    rowstart: 1,
    numrows: 27,
    rowheights: [20, 39, 20, 35, 20, 20, 20, 20, 20, 19, 20, 33, 20, 20, 20, 20, 20],
    colwidths: [100, 100, 100, 100, 100, 100, 100, 100, 100]
}

const TE_fontStyles = {
    background: "white",
    fontFamily: "Amarante",
    fontColor: "black",
    vertical: "middle"
}

const TE_innerRanges = [
    {
        background: TE_fontStyles.background,
        fontFamily: TE_fontStyles.fontFamily,
        fontColor: TE_fontStyles.fontColor,
        vertical: TE_fontStyles.vertical,
        a1notation: "B2",
        horizontal: "right",
        value: "Title: ",
        fontSize: 14,
        merge: false
    },
    {
        background: TE_fontStyles.background,
        fontFamily: TE_fontStyles.fontFamily,
        fontColor: TE_fontStyles.fontColor,
        vertical: TE_fontStyles.vertical,
        a1notation: "C2:E2",
        horizontal: "left",
        fontSize: 14,
        value: null,
        merge: true,
    },
    {
        background: TE_fontStyles.background,
        fontFamily: TE_fontStyles.fontFamily,
        fontColor: TE_fontStyles.fontColor,
        vertical: TE_fontStyles.vertical,
        a1notation: "B4",
        horizontal: "right",
        value: "Publisher: ",
        fontSize: 14,
        merge: false
    },
    {
        background: TE_fontStyles.background,
        fontFamily: TE_fontStyles.fontFamily,
        fontColor: TE_fontStyles.fontColor,
        vertical: TE_fontStyles.vertical,
        a1notation: "C4:E4",
        horizontal: "left",
        fontSize: 14,
        value: null,
        merge: true,
    },
    {
        background: TE_fontStyles.background,
        fontFamily: TE_fontStyles.fontFamily,
        fontColor: TE_fontStyles.fontColor,
        vertical: TE_fontStyles.vertical,
        a1notation: "B6",
        horizontal: "right",
        fontSize: 12,
        value: "Volume: ",
        merge: false
    },
    {
        background: TE_fontStyles.background,
        fontFamily: TE_fontStyles.fontFamily,
        fontColor: TE_fontStyles.fontColor,
        vertical: TE_fontStyles.vertical,
        a1notation: "C6",
        horizontal: "left",
        fontSize: 12,
        value: null,
        merge: false
    },
    {
        background: TE_fontStyles.background,
        fontFamily: TE_fontStyles.fontFamily,
        fontColor: TE_fontStyles.fontColor,
        vertical: TE_fontStyles.vertical,
        a1notation: "B8",
        horizontal: "right",
        fontSize: 12,
        value: "First#: ",
        merge: false
    },
    {
        background: TE_fontStyles.background,
        fontFamily: TE_fontStyles.fontFamily,
        fontColor: TE_fontStyles.fontColor,
        vertical: TE_fontStyles.vertical,
        a1notation: "C8",
        horizontal: "left",
        fontSize: 12,
        value: null,
        merge: false
    },
    {
        background: TE_fontStyles.background,
        fontFamily: TE_fontStyles.fontFamily,
        fontColor: TE_fontStyles.fontColor,
        vertical: TE_fontStyles.vertical,
        a1notation: "B10",
        horizontal: "right",
        fontSize: 12,
        value: "Last#: ",
        merge: false
    }, 
    {
        background: TE_fontStyles.background,
        fontFamily: TE_fontStyles.fontFamily,
        fontColor: TE_fontStyles.fontColor,
        vertical: TE_fontStyles.vertical,
        a1notation: "C10",
        horizontal: "left",
        fontSize: 12,
        value: null,
        merge: false
    },
    {
        background: "#d9d2e9",
        fontFamily: TE_fontStyles.fontFamily,
        fontColor: TE_fontStyles.fontColor,
        vertical: TE_fontStyles.vertical,
        a1notation: "B12:C12",
        horizontal: "center",
        fontSize: 14,
        value: "Issues",
        merge: true,
        border: [true, true, true, true, false, false, "black",
            SpreadsheetApp.BorderStyle.DOUBLE
        ],
    },
    {
        background: "#cfe2f3",
        fontFamily: TE_fontStyles.fontFamily,
        fontColor: TE_fontStyles.fontColor,
        vertical: TE_fontStyles.vertical,
        horizontal: "center",
        fontSize: 12,
        merge: false,
        a1notation: "B14",
        value: "Number",
    },
    {
        background: "#cfe2f3",
        fontFamily: TE_fontStyles.fontFamily,
        fontColor: TE_fontStyles.fontColor,
        vertical: TE_fontStyles.vertical,
        horizontal: "center",
        fontSize: 12,
        merge: false,
        a1notation: "C14",
        value: "Month",
    },
    {
        background: "#cfe2f3",
        fontFamily: TE_fontStyles.fontFamily,
        fontColor: TE_fontStyles.fontColor,
        vertical: TE_fontStyles.vertical,
        horizontal: "center",
        fontSize: 12,
        merge: false,
        a1notation: "D14",
        value: "Year",
    },
    {
        background: "#cfe2f3",
        fontFamily: TE_fontStyles.fontFamily,
        fontColor: TE_fontStyles.fontColor,
        vertical: TE_fontStyles.vertical,
        horizontal: "center",
        fontSize: 12,
        merge: false,
        a1notation: "E14",
        value: "Condition",
    },
    {
        background: "#cfe2f3",
        fontFamily: TE_fontStyles.fontFamily,
        fontColor: TE_fontStyles.fontColor,
        vertical: TE_fontStyles.vertical,
        horizontal: "center",
        fontSize: 12,
        merge: false,
        a1notation: "F14",
        value: "Location",
    },
    {
        background: "#cfe2f3",
        fontFamily: TE_fontStyles.fontFamily,
        fontColor: TE_fontStyles.fontColor,
        vertical: TE_fontStyles.vertical,
        horizontal: "center",
        fontSize: 12,
        merge: false,
        a1notation: "G14",
        value: "Online",
    },
    {
        background: "#cfe2f3",
        fontFamily: TE_fontStyles.fontFamily,
        fontColor: TE_fontStyles.fontColor,
        vertical: TE_fontStyles.vertical,
        horizontal: "center",
        fontSize: 12,
        merge: false,
        a1notation: "H14",
        value: "Notes",
    },
    {
        background: "#f3f3f3",
        fontColor:  "#f3f3f3",
        merge:      false,
        a1notation: "I14",
        value:      "id",
        fontFamily: TE_fontStyles.fontFamily,
        vertical: TE_fontStyles.vertical,
        horizontal: "center",
        fontSize: 12,
    },
     {
        background: TE_fontStyles.background,
        fontFamily: "EB Garamond",
        fontColor: TE_fontStyles.fontColor,
        vertical: TE_fontStyles.vertical,
        a1notation: "E6:F6",
        horizontal: "Center",
        fontSize: 12,
        value: null,
        merge: true,
        options: ["Functions", "Edit title", "Add issue", "Cancel"]
    },
    {
        background: TE_fontStyles.background,
        fontFamily: TE_fontStyles.fontFamily,
        fontColor: TE_fontStyles.fontColor,
        vertical: TE_fontStyles.vertical,
        a1notation: "E12",
        horizontal: "Center",
        fontSize: 12,
        value: "ID",
        merge: false
    },
    {
        background: TE_fontStyles.background,
        fontFamily: TE_fontStyles.fontFamily,
        fontColor: TE_fontStyles.fontColor,
        vertical: TE_fontStyles.vertical,
        a1notation: "F12",
        horizontal: "Center",
        fontSize: 12,
        value: null,
        merge: false
    },
    // display area
    {
        background: "#d9d2e9",
        fontFamily: TE_fontStyles.fontFamily,
        fontColor: TE_fontStyles.fontColor,
        vertical: TE_fontStyles.vertical,
        a1notation: "G2:H3",
        horizontal: "left",
        vertical: "top",
        fontSize: 12,
        value: null,
        merge: true,
        border: [true, true, true, true, false, false, "#a61c00",
            SpreadsheetApp.BorderStyle.SOLID_MEDIUM
        ],
        wrap: "wrap"
    },

];



