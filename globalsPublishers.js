
const LIGHT_GRAY_3 = '#f3f3f3';
const LIGHT_ORANGE_3 = '#fce5cd';
const DARK_RED_2 = "#a61c00";

const FORM_RANGE = "A1:E18";

const PUB_TITLE_MERGE = "B2:D3";
const PUB_TITLE_RANGE = "B2";

const PUB_PUBLISHERS_LABEL_RANGE = "B5";
const PUB_PUBLISHERS_DROPDOWN_MERGE = "C5:D5";
const PUB_PUBLISHERS_DROPDOWN_RANGE = "C5";

const PUB_SEARCH_LABEL_RANGE = "B7";
const PUB_SEARCH_MERGE = "C7:D7";
const PUB_SEARCH_RANGE = "C7";

const PUB_FUNCTIONS_LABEL = "B9";
const PUB_FUNCTIONS_MERGE = "C9:D9";
const PUB_FUNCTIONS_RANGE = "C9";

const PUB_TITLE_FONT = "DynaPuff";
const PUB_TITLE_SIZE = 18;

const PUB_FONT_COLOR = "black";
const PUB_DEFAULT_BACK = "white";
const PUB_DEFAULT_FONT = "EB Garamond";
const PUB_DEFAULT_SIZE = 11;

const PUB_LABEL_FONT = "Comic Sans MS";

const PUB_DISPLAY_MERGE = "B12:D15";
const PUB_DISPLAY_RANGE = "B12";

const PUB_ROW_HEIGHTS = [ 20, 20, 20, 20, 44, 20, 34, 20, 33, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
const PUB_COL_WIDTHS = 100;

const PUB_FUNCTIONS_OPTIONS = ['Options', 'Submit new publisher','Cancel'];

const PUB_CONFIRMATION_RANGE = "D16";


const PUB_NEW_RANGES = [
    {
        a1notation:     FORM_RANGE,
        background:     LIGHT_ORANGE_3,
        font_family:    PUB_DEFAULT_FONT,
        font_size:      PUB_DEFAULT_SIZE,
        font_color:     "black",
        horizontal:     "left",
        vertical:       "middle",
        merge:          false,
        borders:        false,
        text:           "",

    },
    {
        a1notation:     PUB_TITLE_MERGE,
        background:     PUB_DEFAULT_BACK,
        font_family:    PUB_TITLE_FONT,
        font_size:      PUB_TITLE_SIZE,
        font_color:     "black",
        horizontal:     "center",
        vertical:       "middle",
        merge:          true,
        borders:        [true, true, true, true, false, false],
        borderstyle:     SpreadsheetApp.BorderStyle.DOUBLE,
        bordercolor:    "black",
        text:           "Publishers",
    },
    {
        a1notation:     PUB_DISPLAY_MERGE,
        background:     LIGHT_GRAY_3,
        font_family:    PUB_DEFAULT_FONT,
        font_size:      PUB_DEFAULT_SIZE,
        font_color:     DARK_RED_2,
        horizontal:     "left",
        vertical:       "middle",
        merge:          true,
        borders:        [true, true, true, true, false, false],
        borderstyle:     SpreadsheetApp.BorderStyle.DOUBLE,
        bordercolor:    "black",
        text:           "",
        wrap:           true,
    },
    {
        a1notation:     PUB_PUBLISHERS_LABEL_RANGE,
        background:     PUB_DEFAULT_BACK,
        font_family:    PUB_LABEL_FONT,
        font_size:      PUB_DEFAULT_SIZE,
        font_color:     "black",
        horizontal:     "right",
        vertical:       "middle",
        merge:          false,
        borders:        false,
        text:           "Publishers: ",

    },
    {
        a1notation:     PUB_SEARCH_LABEL_RANGE,
        background:     PUB_DEFAULT_BACK,
        font_family:    PUB_LABEL_FONT,
        font_size:      PUB_DEFAULT_SIZE,
        font_color:     "black",
        horizontal:     "right",
        vertical:       "middle",
        merge:          false,
        borders:        false,
        text:           "New/Edit: ",

    },
    {
        a1notation:     PUB_FUNCTIONS_LABEL,
        background:     PUB_DEFAULT_BACK,
        font_family:    PUB_LABEL_FONT,
        font_size:      PUB_DEFAULT_SIZE,
        font_color:     "black",
        horizontal:     "right",
        vertical:       "middle",
        merge:          false,
        borders:        false,
        text:           "Functions: ",

    },
    {
        a1notation:     PUB_PUBLISHERS_DROPDOWN_MERGE,
        background:     PUB_DEFAULT_BACK,
        font_family:    PUB_DEFAULT_FONT,
        font_size:      PUB_DEFAULT_SIZE,
        font_color:     "black",
        horizontal:     "center",
        vertical:       "middle",
        merge:          true,
        borders:        [true, true, true, true, false, false],
        borderstyle:     SpreadsheetApp.BorderStyle.SOLID,
        bordercolor:    "black",
        text:           "Select one",

    },
    {
        a1notation:     PUB_SEARCH_MERGE,
        background:     PUB_DEFAULT_BACK,
        font_family:    PUB_DEFAULT_FONT,
        font_size:      PUB_DEFAULT_SIZE,
        font_color:     "black",
        horizontal:     "left",
        vertical:       "middle",
        merge:          true,
        borders:        false,
        text:           "",
    },    
    {
        a1notation:     PUB_FUNCTIONS_MERGE,
        background:     PUB_DEFAULT_BACK,
        font_family:    PUB_DEFAULT_FONT,
        font_size:      PUB_DEFAULT_SIZE,
        font_color:     "black",
        horizontal:     "center",
        vertical:       "middle",
        merge:          true,
        borders:        [true, true, true, true, false, false],
        borderstyle:     SpreadsheetApp.BorderStyle.SOLID,
        bordercolor:    "black",
        text:           "Options",
    },    


];
