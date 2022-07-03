
let error_detail = require('./tools/try_catch_error_detail');
let request_validation = require('./tools/request_validation');
let axios = require('axios').default;
let axios_generate = require('./tools/axios_generate');


exports.getToken = async (req_body_origin) => {

    //================== memory list =================
    // console.log(cfg_temp.data_memory)
    //================== memory list =================

    let res_json = {};
    let req_body = JSON.parse(JSON.stringify(req_body_origin));

    let data_request_value = {
        API_3RD_ID: req_body.API_3RD_ID,//|| cfg.API_3RD_ID,
        API_3RD_SECRET_KEY: req_body.API_3RD_SECRET_KEY,// || cfg.API_3RD_SECRET_KEY,
    };
    let data_request_schema = {
        API_3RD_ID: "string",
        API_3RD_SECRET_KEY: "string",
    };
    let check_data = await request_validation.check_all_with_schema_v2(data_request_value, data_request_schema);

    if (check_data.statusCode == 0) {


        check_data.error = {
            short: check_data.all_error_key,
            detail: check_data.all_error
        };

        delete check_data.data;

        delete check_data.all_error;

        delete check_data.all_error_index;

        delete check_data.all_error_key;
        delete check_data.all_error_key_array;

        delete check_data.all_value_index;
        delete check_data.all_value;

        delete check_data.undefined_error;
        delete check_data.undefined_error_index;

        delete check_data.undefined_error_key;
        delete check_data.undefined_error_key_array;

        delete check_data.undefined_value_index;
        delete check_data.undefined_value;

        delete check_data.schema_error;
        delete check_data.schema_error_index;

        delete check_data.schema_error_key;
        delete check_data.schema_error_key_array;

        delete check_data.schema_value_index;
        delete check_data.schema_value;

        delete check_data.length_error;
        delete check_data.length_error_index;

        delete check_data.length_error_key;
        delete check_data.length_error_key_array;

        delete check_data.length_value_index;
        delete check_data.length_value;

        return check_data
    }


   
    try {

        let url_parameter = `${cfg.API_3RD_HOST}/api/v2/auth?id=${req_body.API_3RD_ID}&secret_key=${req_body.API_3RD_SECRET_KEY}&type=${cfg.API_3RD_TYPE}`

        // let result = await axios({
        //     method: 'post',
        //     url: url_parameter
        // })

        //========================= RATE LIMIT HANDLE 20220517 ==========================
        let result = null

        let AxiosParams = {
            method: 'post',
            url: url_parameter
        }

        result = await axios_generate.AxiosSetup(AxiosParams, "FORSTOK")
        //========================= /RATE LIMIT HANDLE 20220517 ==========================

        if (result && result.status == 200 && result.data.data && result.data.data.token) { // FIX 2022-01-26
            res_json.statusCode = 1
            res_json.message = "Successful"
            // res_json.status = (result.data) ? result.data.status : null
            // // res_json.token = (result.data) ? result.data.data.token : null
            // res_json.data = (result.data) ? result.data.data : null
            res_json.response = (result.data) ? result.data : null

            //================== memory insert =================

            if (cfg_temp.data_memory.findIndex(obj => obj.API_3RD_ID === req_body.API_3RD_ID) == -1) {
                // console.log(data not exist !");
                cfg_temp.data_memory.push({
                    API_3RD_HOST: cfg.API_3RD_HOST,
                    API_3RD_HOST2: cfg.API_3RD_HOST2,
                    API_3RD_ID: req_body.API_3RD_ID,
                    API_3RD_SECRET_KEY: req_body.API_3RD_SECRET_KEY,
                    API_3RD_TYPE: req_body.API_3RD_TYPE,
                    API_3RD_TOKEN: result.data.data.token,
                    API_3RD_EXP_AT: result.data.data.exp_at,
                })

            }

            //================== memory insert =================

        } else {
            res_json.statusCode = 0
            res_json.status = (result.data) ? result.data.status : null
            // res_json.message = "Invalid Username or Password"
            // res_json.data = (result.data) ? result.data.data : null
            let API_3RD_message = (result.data && result.data.data && result.data.data.message) ? ", " + result.data.data.message : ""
            res_json.message = "Invalid Username or Password, status :" + result.data.status + API_3RD_message
            res_json.response = (result.data) ? result.data : null

        }




        return res_json

    } catch (error) {
        console.log('function auth.getToken, error : ' + error.message);
        error_detail.try_catch_error_detail(error);
        res_json.statusCode = 0;
        res_json.message = error.message;
        return res_json;
    }


}

