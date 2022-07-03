// Maintainer : Eki

// READ ME  : 
// function ini digunakan GENERATE TOKEN UPFOS
// agar otomatis sort object by alphabetical

// NOT JANGAN RUBAH FUNCTION INI, BERHUBUNGAN DENGAN UPFOS MARKETPLACE

exports.objectSortByAlphabetical = (req_body_origin) => {

    let res_json = {}
    let req_body = req_body_origin

    let new_object = {}
    let new_array = []

    try {

        if (req_body == undefined) {
            res_json.statusCode = 1
            res_json.before_sort = null
            res_json.after_sort = null
            res_json.before_sort_string = null
            res_json.after_sort_string = null
            return res_json
        }

        // let add_new_object = null;
        for (let i_a = 0; i_a < Object.keys(req_body).length; i_a++) {
            // add_new_object = { [`${Object.keys(req_body)[i_a]}`]: Object.value(req_body)[i_a] };
            new_array.push({
                k: Object.keys(req_body)[i_a],
                v: Object.values(req_body)[i_a]
            })

        }

        new_array.sort(function (a, b) { // GITHUB COPILOT
            if (a.k < b.k) {
                return -1;
            }
            if (a.k > b.k) {
                return 1;
            }
            return 0;
        });


        new_object = Object.assign({}, ...new_array.map(item => ({ [item.k]: item.v })));  // GITHUB COPILOT
        // new_object = Object.assign(new_object, add_new_object);

        let req_body_string = ""

        for (let i_b = 0; i_b < Object.keys(req_body).length; i_b++) {
            req_body_string = req_body_string.concat(`${Object.keys(req_body)[i_b]}${Object.values(req_body)[i_b]}`)
        }

        let new_object_string = ""

        for (let i_b = 0; i_b < Object.keys(new_object).length; i_b++) {
            new_object_string = new_object_string.concat(`${Object.keys(new_object)[i_b]}${Object.values(new_object)[i_b]}`)
        }

        res_json.statusCode = 1
        res_json.before_sort = req_body
        res_json.after_sort = new_object
        res_json.before_sort_string = req_body_string
        res_json.after_sort_string = new_object_string

        return res_json

    } catch (error) {
        console.log('function auto_data_object_sort_alphabetical.objectSortByAlphabetical, error : ' + error.message);
        // error_detail.try_catch_error_detail(error);
        res_json.statusCode = 0;
        res_json.message = error.message;
        return res_json;

    }

}
