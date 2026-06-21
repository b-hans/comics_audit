function validMonth (params) {

    const display = params.display;
    const month = params.month;

    try {

        if (MONTHS_ARRAY.includes(month) && month != "Select one") {
            return {
                valid: true,
                month: month,
            }
        }
        else if (MONTHS_ARRAY.includes(month)) {
            return {
                valid: true,
                month: '',
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