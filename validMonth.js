function validMonth (params) {

    const display = params.display;
    const month = params.month;

    try {

        console.log ('test1', month);
        console.log ('test2', MONTHS_ARRAY);

        if (MONTHS_ARRAY.includes(month) && month != "Select one") {
            return {
                valid: true,
                month: month,
            }
        }
        else {
            return {
                valid: false,
                month: month,
            }
        }


    } catch (error) {
        display.setValue ("Error validating month: " + error);
        return { valid: false }
    }
}