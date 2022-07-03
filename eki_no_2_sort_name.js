data = [
    'evan|50000|D',
    'jefry|70000|C',
    'rizky|30000|D',
    'hanson|10000|B',
    'candra|30000|A',
    'goklas|20000|A',
    'hendra|20000|B',
    'surya|30000|A',
]
dataAfterSplit = []

function ekiSortCheck(Arrpoint, SortMode = "name", AscDesc = "asc", ShowConsole = true) {

    for (let i_a = 0; i_a < Arrpoint.length; i_a++) {
        let arr_a = Arrpoint[i_a].split("|")

        const unwind_obj = {
            name: arr_a[0],
            point: arr_a[1],
            grade: arr_a[2]
        };

        dataAfterSplit.push(unwind_obj)
    }

    let CopyMemory = []
    CopyMemory.push({ arr_point: dataAfterSplit })
    let NewdataAfterSplit = CopyMemory[0].arr_point

    console.log("=============== BEFORE SORT ===============")
    console.log("Input : ")
    console.log(data)
    // if (ShowConsole == true) {
    //     console.log(dataAfterSplit)
    // }


    console.log("=============== AFTER SORT ===============")
    if (SortMode == "point" && AscDesc == "asc") {
        console.log("--- SORT BY point ASC ---")

        for (let i_a = 0; i_a < NewdataAfterSplit.length; i_a++) {
            for (let i_b = 0; i_b < NewdataAfterSplit.length; i_b++) {
                if (NewdataAfterSplit[i_a].point < NewdataAfterSplit[i_b].point) {
                    let temp = NewdataAfterSplit[i_a]
                    NewdataAfterSplit[i_a] = NewdataAfterSplit[i_b]
                    NewdataAfterSplit[i_b] = temp
                }
            }
        }

    } else if (SortMode == "point" && AscDesc == "desc") {
        console.log("--- SORT BY point DESC ---")

        for (let i_a = 0; i_a < NewdataAfterSplit.length; i_a++) {
            for (let i_b = 0; i_b < NewdataAfterSplit.length; i_b++) {
                if (NewdataAfterSplit[i_a].point > NewdataAfterSplit[i_b].point) {
                    let temp = NewdataAfterSplit[i_a]
                    NewdataAfterSplit[i_a] = NewdataAfterSplit[i_b]
                    NewdataAfterSplit[i_b] = temp
                }
            }
        }

    } else if (SortMode == "name" && AscDesc == "asc") {
        console.log("--- SORT BY NAME ASC ---")
        NewdataAfterSplit.sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });


    } else if (SortMode == "name" && AscDesc == "desc") {
        console.log("--- SORT BY NAME DESC ---")
        NewdataAfterSplit.sort(function (a, b) {
            if (a.name > b.name) {
                return -1;
            }
            if (a.name < b.name) {
                return 1;
            }
            return 0;
        });


    } else if (SortMode == "grade" && AscDesc == "asc") {
        console.log("--- SORT BY GRADE ASC ---")
        NewdataAfterSplit.sort(function (a, b) {
            if (a.grade < b.grade) {
                return -1;
            }
            if (a.grade > b.grade) {
                return 1;
            }
            return 0;
        });


    } else if (SortMode == "grade" && AscDesc == "desc") {
        console.log("--- SORT BY GRADE DESC ---")
        NewdataAfterSplit.sort(function (a, b) {
            if (a.grade > b.grade) {
                return -1;
            }
            if (a.grade < b.grade) {
                return 1;
            }
            return 0;
        });


    }



    if (ShowConsole == true) {
        console.log(NewdataAfterSplit)
    }


    if (ShowConsole == true) {
        let Stringpoint = []
        for (let i_arr = 0; i_arr < dataAfterSplit.length; i_arr++) {
            let strpoint = dataAfterSplit[i_arr].name + "|" + dataAfterSplit[i_arr].point + "|" + dataAfterSplit[i_arr].grade
            Stringpoint.push(strpoint)
        }

        console.log(Stringpoint)
    }



    let NameArr = []
    for (let i_a = 0; i_a < dataAfterSplit.length; i_a++) {
        NameArr.push(dataAfterSplit[i_a].name)

    }
    console.log("Output : ")
    console.log(NameArr)

}


// ekiSortCheck(data, "point", "asc", true) // BONUS
// ekiSortCheck(data, "point", "desc", true)  // BONUS
// ekiSortCheck(data, "name", "asc", true) // BONUS
// ekiSortCheck(data, "name", "desc", true)  // BONUS
// ekiSortCheck(data, "grade", "asc", true)  // BONUS
// ekiSortCheck(data, "grade", "desc", true)  // BONUS

// ekiSortCheck(data, "point", "asc", false) // BONUS
// ekiSortCheck(data, "point", "desc", false)  // BONUS
// ekiSortCheck(data, "name", "asc", false)  // BONUS
// ekiSortCheck(data, "name", "desc", false)  // BONUS
// ekiSortCheck(data, "grade", "asc", false)  // BONUS
// ekiSortCheck(data, "grade", "desc", false)  // BONUS


ekiSortCheck(data)