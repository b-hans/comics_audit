function findIn2D(params) {
    const arr = params.arr;
    const index = params.index;
    const searcher = params.searcher;

    try {

        for (let i=0; i<arr.length; i++) {
            if (arr[i][index] == searcher){
                return {
                    match: true,
                    row: arr[i]
                }
            }
        }

        return { match: false }

    } catch (error) {
        return {
            match: false
        }
    }

}