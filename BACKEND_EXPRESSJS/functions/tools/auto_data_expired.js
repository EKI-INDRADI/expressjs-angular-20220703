
let moment = require('moment-timezone');

exports.ConvertExpiresInToExpiredDate = (expires_in = null) => { // minutes , hours , days only 
    let res_json = {};

    // expires_in = "5m"
    // expires_in = "5M"
    // expires_in = "10h"
    // expires_in = "10H"
    // expires_in = "7d"
    // expires_in = "7D"


    try {

        if (expires_in && typeof expires_in == 'string') {


        } else {
            res_json.statusCode = 0
            res_json.message = "Object is not string"
            return res_json
        }

        let date_gmt_plus_7 = new Date(moment().tz('Asia/Jakarta'));
        let expired_date_temp = new Date()

        if (
            String(expires_in).includes('m') == true ||
            String(expires_in).includes('M') == true
        ) {

            let value_set = String(expires_in)
            value_set = value_set.replace("m", "")
            value_set = value_set.replace("M", "")

            if (value_set != "") {
                value_set = Number(value_set)
            } else {
                value_set = 1
            }

            expired_date_temp = date_gmt_plus_7.setMinutes(date_gmt_plus_7.getMinutes() + value_set); // NOW + value_set Minutes 

        } else if (
            String(expires_in).includes('h') == true ||
            String(expires_in).includes('H') == true
        ) {


            let value_set = String(expires_in)
            value_set = value_set.replace("h", "")
            value_set = value_set.replace("H", "")

            if (value_set != "") {
                value_set = Number(value_set)
            } else {
                value_set = 1
            }


            expired_date_temp = date_gmt_plus_7.setHours(date_gmt_plus_7.getHours() + value_set);  // NOW + value_set Hours

        } else if (
            String(expires_in).includes('d') == true ||
            String(expires_in).includes('D') == true
        ) {

            let value_set = String(expires_in)
            value_set = value_set.replace("d", "")
            value_set = value_set.replace("D", "")

            if (value_set != "") {
                value_set = Number(value_set)
            } else {
                value_set = 1
            }

            expired_date_temp = date_gmt_plus_7.setDate(date_gmt_plus_7.getDate() + value_set); //NOW + value_set days

        } else {
            res_json.statusCode = 0
            res_json.message = "Object string but without m/M/h/H/d/D value !"
            return res_json
        }

        res_json.statusCode = 1
        res_json.expired_date = moment(expired_date_temp)
        return res_json

    } catch (error) {
        console.log('function auto_data_expired.ConvertExpiresInToExpiredDate, error : ' + error.message);
        res_json.statusCode = 0;
        res_json.message = error.message;
        return res_json;
    }

};

// console.log(exports.ConvertExpiresInToExpiredDate('10D'))
// console.log(auto_data_expired_function.ConvertExpiresInToExpiredDate("1D").expired_date)