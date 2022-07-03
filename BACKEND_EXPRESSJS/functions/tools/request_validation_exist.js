
// Maintainer : Eki

// READ ME  : 
// function ini digunakan untuk melakukan validasi data exist pada database dalam 1x request dan 
// dapat memberikan return (secara custom)
// tanpa inject depedency

// const db = require('../../mongodb2');
const db = require("../../models");
const error_detail = require('./try_catch_error_detail');
let axios = require('axios').default;


exports.exist_validation_elemMatch_without_field_name = async function (collection_name,  custom_filter = {}, array_value = [], data_return = 0, elemMatchValue = null) { //20220624 (tested)
  // ========================== NOTE ==========================
  // collection_name = nama collection / nama tabel
  // field_name = nama field / nama key
  // custom_filter = parameter condition untuk filter data
  // array_value =  value array
  // data_return =  1  mengembalikan return ,0 tidak mengembalikan return
  // ========================== /NOTE ==========================

  // ========================== EXAMPLE ==========================
  // const request_validation_exist = require('./tools/request_validation_exist');
  // let sales_order_condition = {
  //   company_id: req_body.company_id,
  //   site: req_body.site
  // };

  // let sales_order_return = 1;
  // let SO_EXIST_VALIDATOR = await request_validation_exist.exist_validation_elemMatch_without_field_name(
  //   'sales_order',
  //   sales_order_condition,
  //   req_body.DO_LIST,
  //   sales_order_return,
  //   'DO'
  // );

  // if (SO_EXIST_VALIDATOR.statusCode == 0) {
  //   return SO_EXIST_VALIDATOR;
  // }
  // ========================== /EXAMPLE ==========================


  let res_json = {};


  try {
    let use_console_loading = 0;
    let use_console_started = 0; //  let use_console_started = 1;

    //  // FIX DUPLICATE ARRAY 2022-02-17
    //  if (arr_create_product_list_x_count.findIndex(check_exist_from_array => check_exist_from_array.sku === result.data.data[i_a].sku) == -1) {
    //   arr_create_product_list_x_count.push(create_product_list);
    // }

    let fix_duplicate_array_value = [];

    let field_name_value = "";
    if (elemMatchValue) {
      field_name_value = elemMatchValue 
    } else {
      field_name_value = field_name;
    }


    if (use_console_started == 1) {
      console.log('start exist/unique remove duplicate : ' + collection_name + '.' + field_name_value + ' - ' + array_value.length + ' data started! ');
    }

    for (let i_a = 0; i_a < array_value.length; i_a++) {
      if (use_console_loading == 1) {
        console.log('loading exist/unique remove duplicate : ' + collection_name + '.' + field_name_value + ' PART I ' + (i_a + 1) + '/' + array_value.length);
      }
      if (typeof array_value[i_a] == 'string') { // FIX CASE SENSITIVE
        if (fix_duplicate_array_value.findIndex(check_exist => String(check_exist).toUpperCase() === String(array_value[i_a]).toUpperCase()) == -1) {
          fix_duplicate_array_value.push(array_value[i_a]); // data not found push
        }
      } else {
        if (fix_duplicate_array_value.findIndex(check_exist => check_exist === array_value[i_a]) == -1) {
          fix_duplicate_array_value.push(array_value[i_a]); // data not found push
        }
      }
    }




    let DataFromCollectionParams = null;

    if (elemMatchValue) {

      DataFromCollectionParams = {
        [elemMatchValue]: {
          $elemMatch: {
              $in: fix_duplicate_array_value
          }
        },
        ...custom_filter
      };

      // console.log(DataFromCollectionParams[elemMatchValue].$elemMatch.v);

    } else {
      DataFromCollectionParams = {
        [field_name]: {
          $in: fix_duplicate_array_value
        },
        ...custom_filter
      };
    }

    // let DataFromCollectionProjection = { [field_name]: 1 };

    let DataFromCollectionProjection = { _id: 0 };

    let DataFromCollection = await db[collection_name].find(
      DataFromCollectionParams,
      DataFromCollectionProjection
    );



    let DONE_VALIDATE_DataFromCollection = []; //elemMatch

    let result = [];

    if (use_console_started == 1) {
      console.log('start exist/unique check : ' + collection_name + '.' + field_name_value + ' - ' + fix_duplicate_array_value.length + ' data started! ');
    }


    for (let i_a = 0; i_a < Number(fix_duplicate_array_value.length); i_a++) { // DONE_VALIDATE
      if (use_console_loading == 1) {
        console.log('loading exist/unique check : ' + collection_name + '.' + field_name_value + ' - ' + (i_a + 1) + '/' + fix_duplicate_array_value.length);
      }



      if (elemMatchValue) {  // PERLU CHECK



        if (DataFromCollection.length > 0) {

          for (let i_xa = 0; i_xa < DataFromCollection.length; i_xa++) {

            // let GetIndexData = await DataFromCollection[i_xa][elemMatchValue].findIndex(async check_exist =>  // JIKA DATA BANYAK PERLU AWAIT ASYNC ( KALO GA BUG ANOYING ) // BUG KALO PAKE ASYNC AWAIT
            //   (check_exist.k === field_name && check_exist.v === fix_duplicate_array_value[i_a])  // JIKA 2 KONDISI WAJIB  // REV 20220606
            //   // (
            //   //   check_exist.k === field_name &&
            //   //   check_exist.v === fix_duplicate_array_value[i_a]
            //   //   // , (check_exist.k === field_name) ? console.log(check_exist.k ) : ""
            //   //   // , (check_exist.v === "122263036") ? console.log(check_exist.v) : ""
            //   // )
            // );




            //==================== MANUAL GET INDEX 20220606 ====================
            let GetIndexData = -1; // NOT FOUND
            for (let i_axx = 0; i_axx < DataFromCollection[i_xa][elemMatchValue].length; i_axx++) {
              if (
                DataFromCollection[i_xa][elemMatchValue][i_axx] == fix_duplicate_array_value[i_a]
              ) {
                GetIndexData = i_xa; // FOUND
              } else {
                continue;
              }
            }
            //==================== MANUAL GET INDEX 20220606 ====================


            // console.log("i_xa : " + i_xa, "GetIndexData : " + GetIndexData, "fix_duplicate_array_value[i_a] : " + fix_duplicate_array_value[i_a]);
            // if (GetIndexData > -1) {
            if (i_xa == GetIndexData && GetIndexData > -1) {
              // console.log("i_xa : " + i_xa, "GetIndexData : " + GetIndexData, "fix_duplicate_array_value[i_a] : " + fix_duplicate_array_value[i_a]);
              // ======================== FIX3 FOUND ========================


              //==================== MANUAL GET INDEX 20220606 ====================
              // if (DONE_VALIDATE_DataFromCollection.findIndex(fix3 =>
              //   fix3 === fix_duplicate_array_value[i_a]
              // ) == -1) {

              let GetIndex_DONE_VALIDATE = -1; // NOT FOUND
              for (let i_x1 = 0; i_x1 < DONE_VALIDATE_DataFromCollection.length; i_x1++) {
                if (
                  DONE_VALIDATE_DataFromCollection[i_x1] == fix_duplicate_array_value[i_a]
                ) {
                  GetIndex_DONE_VALIDATE = i_x1; // FOUND
                } else {
                  continue;
                }
              }
              //==================== MANUAL GET INDEX 20220606 ====================

              if (GetIndex_DONE_VALIDATE == -1) {

                let result_params = {};
                result_params.value = fix_duplicate_array_value[i_a];
                result_params.exist = 1; //'exist';

                if (data_return == 1) {
                  result_params.return = await DataFromCollection[GetIndexData]; //20220606

                  
                } //end if

                result.push(result_params);
                DONE_VALIDATE_DataFromCollection.push(fix_duplicate_array_value[i_a]);
              } //end if fix3

              // ======================== FIX3 FOUND ========================

            }




          } // end for DataFromCollection

        } else {  // BUG FIX 20220520


          // ======================== FIX3 NOT FOUND ========================

          //==================== MANUAL GET INDEX 20220606 ====================
          // if (DONE_VALIDATE_DataFromCollection.findIndex(fix3 =>
          //   fix3 === fix_duplicate_array_value[i_a]
          // ) == -1) {

          let GetIndex_DONE_VALIDATE = -1; // NOT FOUND
          for (let i_x1 = 0; i_x1 < DONE_VALIDATE_DataFromCollection.length; i_x1++) {
            if (
              DONE_VALIDATE_DataFromCollection[i_x1] == fix_duplicate_array_value[i_a]
            ) {
              GetIndex_DONE_VALIDATE = i_x1; // FOUND
            } else {
              continue;
            }
          }
          //==================== MANUAL GET INDEX 20220606 ====================

          if (GetIndex_DONE_VALIDATE == -1) {

            let result_params = {};
            result_params.value = fix_duplicate_array_value[i_a];
            result_params.exist = 0; //'not found';
            if (data_return == 1) {
              result_params.return = null;
            }

            result.push(result_params);
            DONE_VALIDATE_DataFromCollection.push(fix_duplicate_array_value[i_a]);
          } //end if fix3

          // ======================== FIX3 NOT FOUND ========================
        } //end if



      } else {


        if (DataFromCollection.findIndex(check_exist => check_exist[field_name] === fix_duplicate_array_value[i_a]) == -1) { // kalo ga ketemu

          let result_params = {};
          result_params.value = fix_duplicate_array_value[i_a];
          result_params.exist = 0; //'not found';
          if (data_return == 1) {
            result_params.return = null;
          }

          result.push(result_params);


        } else {


          let result_params = {};
          result_params.value = fix_duplicate_array_value[i_a];
          result_params.exist = 1; //'exist';
          if (data_return == 1) {
            result_params.return = DataFromCollection.find(data => data[field_name] == fix_duplicate_array_value[i_a]);
          }
          result.push(result_params);

        }// end if

      }





    } // end for fix_duplicate_array_value




    // ============================= COUNT RESULT =============================


    // for (let i_count = 0; i_count < result.length; i_count++) {
    //   result[i_count].count = result.filter(x => x.value == result[i_count].value).length;

    //   if (use_console_started == 1) {
    //     console.log('start exist/unique remove duplicate result : ' + collection_name + '.' + field_name_value + ' - ' + ResultFixDuplicate[i_count].count + ' result');
    //   }

    // }

    // ============================= COUNT RESULT =============================

    // console.log(result);
    // ============================== FIX DUPLICATE RESULT 20220525 ============================== 



    if (elemMatchValue) { // BUG FIX 20220606
      for (let ixx1 = 0; ixx1 < fix_duplicate_array_value.length; ixx1++) {
        let getIndex = result.findIndex(fix2 => fix2.value === fix_duplicate_array_value[ixx1]);
        if (getIndex == -1) {

          let result_objx = {}

          result_objx.value = fix_duplicate_array_value[ixx1]
          result_objx.exist = 0
          if (data_return == 1) {
            result_objx.return = null
          }
          result.push(result_objx);

        }
      }
    }






    // let ResultFixDuplicate = [];


    // // if (elemMatchValue) {

    // for (let i_fix = 0; i_fix < result.length; i_fix++) {
    //   if (ResultFixDuplicate.findIndex(check_exist => check_exist.value === result[i_fix].value) == -1) {
    //     // ADA BEBERAPA EXIST YANG SEHARUSNYA 1 tapi malah 0 ( untuk length sudah benar )
    //     ResultFixDuplicate.push(result[i_fix]); // data not found push
    //   }

    // }


    // for (let i_count = 0; i_count < ResultFixDuplicate.length; i_count++) {



    //   ResultFixDuplicate[i_count].count = result.filter(x => x.value == ResultFixDuplicate[i_count].value).length;

    //   if (use_console_started == 1) {
    //     console.log('start exist/unique remove duplicate result : ' + collection_name + '.' + field_name_value + ' - ' + ResultFixDuplicate[i_count].count + ' result');
    //   }

    // }


    // result = ResultFixDuplicate;

    // // }

    // ============================== FIX DUPLICATE RESULT 20220525 ============================== 

    res_json.statusCode = 1;
    res_json.data = result;
    return res_json;


  } catch (error) {
    console.log('function request_validation_exist.exist_validation_elemMatch_kv, error : ' + error.message);
    error_detail.try_catch_error_detail(error);

    res_json.statusCode = 0;
    res_json.message = error.message;

    return res_json;
  }


};

exports.exist_validation_elemMatch = async function (collection_name, field_name, custom_filter = {}, array_value = [], data_return = 0, elemMatchValue = null) {
  // ========================== NOTE ==========================
  // collection_name = nama collection / nama tabel
  // field_name = nama field / nama key
  // custom_filter = parameter condition untuk filter data
  // array_value =  value array
  // data_return =  1  mengembalikan return ,0 tidak mengembalikan return
  // ========================== /NOTE ==========================

  // ========================== EXAMPLE ==========================
  // const request_validation_exist = require('./tools/request_validation_exist');
  // let account_code_array = ["1601.003", "1602.002", "6101.004", "1101.001", "1101.001", "1101.001", "1101.001", "xxx"];
  // let account_code_condition = {
  //   company_id: "EKITESTING_MIGRATION-174"
  // };
  // let account_code_return = 1
  // let account_code_validator = await request_validation_exist.exist_validation('accounts', 'account_code', account_code_condition, account_code_array, account_code_return);
  // return account_code_validator;
  // ========================== /EXAMPLE ==========================


  let res_json = {};


  try {
    let use_console_loading = 0;
    let use_console_started = 0; //  let use_console_started = 1;

    //  // FIX DUPLICATE ARRAY 2022-02-17
    //  if (arr_create_product_list_x_count.findIndex(check_exist_from_array => check_exist_from_array.sku === result.data.data[i_a].sku) == -1) {
    //   arr_create_product_list_x_count.push(create_product_list);
    // }

    let fix_duplicate_array_value = [];

    let field_name_value = null;
    if (elemMatchValue) {
      field_name_value = elemMatchValue + '.v = \'' + field_name + '\'';
    } else {
      field_name_value = field_name;
    }


    if (use_console_started == 1) {
      console.log('start exist/unique remove duplicate : ' + collection_name + '.' + field_name_value + ' - ' + array_value.length + ' data started! ');
    }

    for (let i_a = 0; i_a < array_value.length; i_a++) {
      if (use_console_loading == 1) {
        console.log('loading exist/unique remove duplicate : ' + collection_name + '.' + field_name_value + ' PART I ' + (i_a + 1) + '/' + array_value.length);
      }
      if (typeof array_value[i_a] == 'string') { // FIX CASE SENSITIVE
        if (fix_duplicate_array_value.findIndex(check_exist => String(check_exist).toUpperCase() === String(array_value[i_a]).toUpperCase()) == -1) {
          fix_duplicate_array_value.push(array_value[i_a]); // data not found push
        }
      } else {
        if (fix_duplicate_array_value.findIndex(check_exist => check_exist === array_value[i_a]) == -1) {
          fix_duplicate_array_value.push(array_value[i_a]); // data not found push
        }
      }
    }




    let DataFromCollectionParams = null;

    if (elemMatchValue) {

      DataFromCollectionParams = {
        [elemMatchValue]: {
          $elemMatch: {
            [field_name]: {
              $in: fix_duplicate_array_value
            }
          }
        },
        ...custom_filter
      };

      // console.log(DataFromCollectionParams[elemMatchValue].$elemMatch.v);

    } else {
      DataFromCollectionParams = {
        [field_name]: {
          $in: fix_duplicate_array_value
        },
        ...custom_filter
      };
    }

    // let DataFromCollectionProjection = { [field_name]: 1 };

    let DataFromCollectionProjection = { _id: 0 };

    let DataFromCollection = await db[collection_name].find(
      DataFromCollectionParams,
      DataFromCollectionProjection
    );



    let DONE_VALIDATE_DataFromCollection = []; //elemMatch

    let result = [];

    if (use_console_started == 1) {
      console.log('start exist/unique check : ' + collection_name + '.' + field_name_value + ' - ' + fix_duplicate_array_value.length + ' data started! ');
    }


    for (let i_a = 0; i_a < Number(fix_duplicate_array_value.length); i_a++) { // DONE_VALIDATE
      if (use_console_loading == 1) {
        console.log('loading exist/unique check : ' + collection_name + '.' + field_name_value + ' - ' + (i_a + 1) + '/' + fix_duplicate_array_value.length);
      }



      if (elemMatchValue) {  // PERLU CHECK



        if (DataFromCollection.length > 0) {

          for (let i_xa = 0; i_xa < DataFromCollection.length; i_xa++) {

            // let GetIndexData = await DataFromCollection[i_xa][elemMatchValue].findIndex(async check_exist =>  // JIKA DATA BANYAK PERLU AWAIT ASYNC ( KALO GA BUG ANOYING ) // BUG KALO PAKE ASYNC AWAIT
            //   (check_exist.k === field_name && check_exist.v === fix_duplicate_array_value[i_a])  // JIKA 2 KONDISI WAJIB  // REV 20220606
            //   // (
            //   //   check_exist.k === field_name &&
            //   //   check_exist.v === fix_duplicate_array_value[i_a]
            //   //   // , (check_exist.k === field_name) ? console.log(check_exist.k ) : ""
            //   //   // , (check_exist.v === "122263036") ? console.log(check_exist.v) : ""
            //   // )
            // );




            //==================== MANUAL GET INDEX 20220606 ====================
            let GetIndexData = -1; // NOT FOUND
            for (let i_axx = 0; i_axx < DataFromCollection[i_xa][elemMatchValue].length; i_axx++) {
              if (
                DataFromCollection[i_xa][elemMatchValue][i_axx][field_name] == fix_duplicate_array_value[i_a]
              ) {
                GetIndexData = i_xa; // FOUND
              } else {
                continue;
              }
            }
            //==================== MANUAL GET INDEX 20220606 ====================


            // console.log("i_xa : " + i_xa, "GetIndexData : " + GetIndexData, "fix_duplicate_array_value[i_a] : " + fix_duplicate_array_value[i_a]);
            // if (GetIndexData > -1) {
            if (i_xa == GetIndexData && GetIndexData > -1) {
              // console.log("i_xa : " + i_xa, "GetIndexData : " + GetIndexData, "fix_duplicate_array_value[i_a] : " + fix_duplicate_array_value[i_a]);
              // ======================== FIX3 FOUND ========================


              //==================== MANUAL GET INDEX 20220606 ====================
              // if (DONE_VALIDATE_DataFromCollection.findIndex(fix3 =>
              //   fix3 === fix_duplicate_array_value[i_a]
              // ) == -1) {

              let GetIndex_DONE_VALIDATE = -1; // NOT FOUND
              for (let i_x1 = 0; i_x1 < DONE_VALIDATE_DataFromCollection.length; i_x1++) {
                if (
                  DONE_VALIDATE_DataFromCollection[i_x1] == fix_duplicate_array_value[i_a]
                ) {
                  GetIndex_DONE_VALIDATE = i_x1; // FOUND
                } else {
                  continue;
                }
              }
              //==================== MANUAL GET INDEX 20220606 ====================

              if (GetIndex_DONE_VALIDATE == -1) {

                let result_params = {};
                result_params.value = fix_duplicate_array_value[i_a];
                result_params.exist = 1; //'exist';

                if (data_return == 1) {
                  result_params.return = await DataFromCollection[GetIndexData]; //20220606

                  
                } //end if

                result.push(result_params);
                DONE_VALIDATE_DataFromCollection.push(fix_duplicate_array_value[i_a]);
              } //end if fix3

              // ======================== FIX3 FOUND ========================

            }




          } // end for DataFromCollection

        } else {  // BUG FIX 20220520


          // ======================== FIX3 NOT FOUND ========================

          //==================== MANUAL GET INDEX 20220606 ====================
          // if (DONE_VALIDATE_DataFromCollection.findIndex(fix3 =>
          //   fix3 === fix_duplicate_array_value[i_a]
          // ) == -1) {

          let GetIndex_DONE_VALIDATE = -1; // NOT FOUND
          for (let i_x1 = 0; i_x1 < DONE_VALIDATE_DataFromCollection.length; i_x1++) {
            if (
              DONE_VALIDATE_DataFromCollection[i_x1] == fix_duplicate_array_value[i_a]
            ) {
              GetIndex_DONE_VALIDATE = i_x1; // FOUND
            } else {
              continue;
            }
          }
          //==================== MANUAL GET INDEX 20220606 ====================

          if (GetIndex_DONE_VALIDATE == -1) {

            let result_params = {};
            result_params.value = fix_duplicate_array_value[i_a];
            result_params.exist = 0; //'not found';
            if (data_return == 1) {
              result_params.return = null;
            }

            result.push(result_params);
            DONE_VALIDATE_DataFromCollection.push(fix_duplicate_array_value[i_a]);
          } //end if fix3

          // ======================== FIX3 NOT FOUND ========================
        } //end if



      } else {


        if (DataFromCollection.findIndex(check_exist => check_exist[field_name] === fix_duplicate_array_value[i_a]) == -1) { // kalo ga ketemu

          let result_params = {};
          result_params.value = fix_duplicate_array_value[i_a];
          result_params.exist = 0; //'not found';
          if (data_return == 1) {
            result_params.return = null;
          }

          result.push(result_params);


        } else {


          let result_params = {};
          result_params.value = fix_duplicate_array_value[i_a];
          result_params.exist = 1; //'exist';
          if (data_return == 1) {
            result_params.return = DataFromCollection.find(data => data[field_name] == fix_duplicate_array_value[i_a]);
          }
          result.push(result_params);

        }// end if

      }





    } // end for fix_duplicate_array_value




    // ============================= COUNT RESULT =============================


    // for (let i_count = 0; i_count < result.length; i_count++) {
    //   result[i_count].count = result.filter(x => x.value == result[i_count].value).length;

    //   if (use_console_started == 1) {
    //     console.log('start exist/unique remove duplicate result : ' + collection_name + '.' + field_name_value + ' - ' + ResultFixDuplicate[i_count].count + ' result');
    //   }

    // }

    // ============================= COUNT RESULT =============================

    // console.log(result);
    // ============================== FIX DUPLICATE RESULT 20220525 ============================== 



    if (elemMatchValue) { // BUG FIX 20220606
      for (let ixx1 = 0; ixx1 < fix_duplicate_array_value.length; ixx1++) {
        let getIndex = result.findIndex(fix2 => fix2.value === fix_duplicate_array_value[ixx1]);
        if (getIndex == -1) {

          let result_objx = {}

          result_objx.value = fix_duplicate_array_value[ixx1]
          result_objx.exist = 0
          if (data_return == 1) {
            result_objx.return = null
          }
          result.push(result_objx);

        }
      }
    }






    // let ResultFixDuplicate = [];


    // // if (elemMatchValue) {

    // for (let i_fix = 0; i_fix < result.length; i_fix++) {
    //   if (ResultFixDuplicate.findIndex(check_exist => check_exist.value === result[i_fix].value) == -1) {
    //     // ADA BEBERAPA EXIST YANG SEHARUSNYA 1 tapi malah 0 ( untuk length sudah benar )
    //     ResultFixDuplicate.push(result[i_fix]); // data not found push
    //   }

    // }


    // for (let i_count = 0; i_count < ResultFixDuplicate.length; i_count++) {



    //   ResultFixDuplicate[i_count].count = result.filter(x => x.value == ResultFixDuplicate[i_count].value).length;

    //   if (use_console_started == 1) {
    //     console.log('start exist/unique remove duplicate result : ' + collection_name + '.' + field_name_value + ' - ' + ResultFixDuplicate[i_count].count + ' result');
    //   }

    // }


    // result = ResultFixDuplicate;

    // // }

    // ============================== FIX DUPLICATE RESULT 20220525 ============================== 

    res_json.statusCode = 1;
    res_json.data = result;
    return res_json;


  } catch (error) {
    console.log('function request_validation_exist.exist_validation_elemMatch_kv, error : ' + error.message);
    error_detail.try_catch_error_detail(error);

    res_json.statusCode = 0;
    res_json.message = error.message;

    return res_json;
  }


};


exports.exist_validation_elemMatch_kv = async function (collection_name, field_name, custom_filter = {}, array_value = [], data_return = 0, elemMatchValue = null) {
  // ========================== NOTE ==========================
  // collection_name = nama collection / nama tabel
  // field_name = nama field / nama key
  // custom_filter = parameter condition untuk filter data
  // array_value =  value array
  // data_return =  1  mengembalikan return ,0 tidak mengembalikan return
  // ========================== /NOTE ==========================

  // ========================== EXAMPLE ==========================
  // const request_validation_exist = require('./tools/request_validation_exist');
  // let account_code_array = ["1601.003", "1602.002", "6101.004", "1101.001", "1101.001", "1101.001", "1101.001", "xxx"];
  // let account_code_condition = {
  //   company_id: "EKITESTING_MIGRATION-174"
  // };
  // let account_code_return = 1
  // let account_code_validator = await request_validation_exist.exist_validation('accounts', 'account_code', account_code_condition, account_code_array, account_code_return);
  // return account_code_validator;
  // ========================== /EXAMPLE ==========================


  let res_json = {};


  try {
    let use_console_loading = 0;
    let use_console_started = 0; //  let use_console_started = 1;

    //  // FIX DUPLICATE ARRAY 2022-02-17
    //  if (arr_create_product_list_x_count.findIndex(check_exist_from_array => check_exist_from_array.sku === result.data.data[i_a].sku) == -1) {
    //   arr_create_product_list_x_count.push(create_product_list);
    // }

    let fix_duplicate_array_value = [];

    let field_name_value = null;
    if (elemMatchValue) {
      field_name_value = elemMatchValue + '.v = \'' + field_name + '\'';
    } else {
      field_name_value = field_name;
    }


    if (use_console_started == 1) {
      console.log('start exist/unique remove duplicate : ' + collection_name + '.' + field_name_value + ' - ' + array_value.length + ' data started! ');
    }

    for (let i_a = 0; i_a < array_value.length; i_a++) {
      if (use_console_loading == 1) {
        console.log('loading exist/unique remove duplicate : ' + collection_name + '.' + field_name_value + ' PART I ' + (i_a + 1) + '/' + array_value.length);
      }
      if (typeof array_value[i_a] == 'string') { // FIX CASE SENSITIVE
        if (fix_duplicate_array_value.findIndex(check_exist => String(check_exist).toUpperCase() === String(array_value[i_a]).toUpperCase()) == -1) {
          fix_duplicate_array_value.push(array_value[i_a]); // data not found push
        }
      } else {
        if (fix_duplicate_array_value.findIndex(check_exist => check_exist === array_value[i_a]) == -1) {
          fix_duplicate_array_value.push(array_value[i_a]); // data not found push
        }
      }
    }




    let DataFromCollectionParams = null;

    if (elemMatchValue) {

      DataFromCollectionParams = {
        [elemMatchValue]: {
          $elemMatch: {
            k: field_name,
            v: {
              $in: fix_duplicate_array_value
            }
          }
        },
        ...custom_filter
      };

      // console.log(DataFromCollectionParams[elemMatchValue].$elemMatch.v);

    } else {
      DataFromCollectionParams = {
        [field_name]: {
          $in: fix_duplicate_array_value
        },
        ...custom_filter
      };
    }

    // let DataFromCollectionProjection = { [field_name]: 1 };

    let DataFromCollectionProjection = { _id: 0 };

    let DataFromCollection = await db[collection_name].find(
      DataFromCollectionParams,
      DataFromCollectionProjection
    );



    let DONE_VALIDATE_DataFromCollection = []; //elemMatch

    let result = [];

    if (use_console_started == 1) {
      console.log('start exist/unique check : ' + collection_name + '.' + field_name_value + ' - ' + fix_duplicate_array_value.length + ' data started! ');
    }


    for (let i_a = 0; i_a < Number(fix_duplicate_array_value.length); i_a++) { // DONE_VALIDATE
      if (use_console_loading == 1) {
        console.log('loading exist/unique check : ' + collection_name + '.' + field_name_value + ' - ' + (i_a + 1) + '/' + fix_duplicate_array_value.length);
      }



      if (elemMatchValue) {  // PERLU CHECK



        if (DataFromCollection.length > 0) {

          for (let i_xa = 0; i_xa < DataFromCollection.length; i_xa++) {

            // let GetIndexData = await DataFromCollection[i_xa][elemMatchValue].findIndex(async check_exist =>  // JIKA DATA BANYAK PERLU AWAIT ASYNC ( KALO GA BUG ANOYING ) // BUG KALO PAKE ASYNC AWAIT
            //   (check_exist.k === field_name && check_exist.v === fix_duplicate_array_value[i_a])  // JIKA 2 KONDISI WAJIB  // REV 20220606
            //   // (
            //   //   check_exist.k === field_name &&
            //   //   check_exist.v === fix_duplicate_array_value[i_a]
            //   //   // , (check_exist.k === field_name) ? console.log(check_exist.k ) : ""
            //   //   // , (check_exist.v === "122263036") ? console.log(check_exist.v) : ""
            //   // )
            // );




            //==================== MANUAL GET INDEX 20220606 ====================
            let GetIndexData = -1; // NOT FOUND
            for (let i_axx = 0; i_axx < DataFromCollection[i_xa][elemMatchValue].length; i_axx++) {
              // console.log(DataFromCollection[i_xa][elemMatchValue][i_axx]['v']); 
              // console.log(DataFromCollection[i_xa][elemMatchValue][i_axx].v)
              if (
                DataFromCollection[i_xa][elemMatchValue][i_axx].k == field_name &&
                DataFromCollection[i_xa][elemMatchValue][i_axx].v == fix_duplicate_array_value[i_a]
              ) {
                GetIndexData = i_xa; // FOUND
              } else {
                continue;
              }
            }
            //==================== MANUAL GET INDEX 20220606 ====================


            // console.log("i_xa : " + i_xa, "GetIndexData : " + GetIndexData, "fix_duplicate_array_value[i_a] : " + fix_duplicate_array_value[i_a]);
            // if (GetIndexData > -1) {
            if (i_xa == GetIndexData && GetIndexData > -1) {
              // console.log("i_xa : " + i_xa, "GetIndexData : " + GetIndexData, "fix_duplicate_array_value[i_a] : " + fix_duplicate_array_value[i_a]);
              // ======================== FIX3 FOUND ========================


              //==================== MANUAL GET INDEX 20220606 ====================
              // if (DONE_VALIDATE_DataFromCollection.findIndex(fix3 =>
              //   fix3 === fix_duplicate_array_value[i_a]
              // ) == -1) {

              let GetIndex_DONE_VALIDATE = -1; // NOT FOUND
              for (let i_x1 = 0; i_x1 < DONE_VALIDATE_DataFromCollection.length; i_x1++) {
                if (
                  DONE_VALIDATE_DataFromCollection[i_x1] == fix_duplicate_array_value[i_a]
                ) {
                  GetIndex_DONE_VALIDATE = i_x1; // FOUND
                } else {
                  continue;
                }
              }
              //==================== MANUAL GET INDEX 20220606 ====================

              if (GetIndex_DONE_VALIDATE == -1) {

                let result_params = {};
                result_params.value = fix_duplicate_array_value[i_a];
                result_params.exist = 1; //'exist';

                if (data_return == 1) {
                  result_params.return = await DataFromCollection[GetIndexData]; //20220606

                  // for (let i_xa = 0; i_xa < DataFromCollection.length; i_xa++) {
                  //   let getIndex = await DataFromCollection[i_xa][elemMatchValue].findIndex(async fix2 =>
                  //     fix2.k === field_name &&
                  //     fix2.v === fix_duplicate_array_value[i_a]
                  //   );

                  //   // if (getIndex > -1) {
                  //   result_params.return = await DataFromCollection[getIndex];
                  //   // } else {
                  //   //   result_params.return = null
                  //   // }

                  //   // }
                  // } //end for

                } //end if

                result.push(result_params);
                DONE_VALIDATE_DataFromCollection.push(fix_duplicate_array_value[i_a]);
              } //end if fix3

              // ======================== FIX3 FOUND ========================

            }



            // ========================================= SUPER BUG
            // else {
            //   // ======================== FIX3 NOT FOUND ========================
            //   if (DONE_VALIDATE_DataFromCollection.findIndex(fix3 =>
            //     fix3 === fix_duplicate_array_value[i_a]
            //   ) == -1) {
            //     let result_params = {};
            //     result_params.value = fix_duplicate_array_value[i_a];
            //     result_params.exist = 0; //'not found';
            //     if (data_return == 1) {
            //       result_params.return = null;
            //     }

            //     result.push(result_params);
            //     DONE_VALIDATE_DataFromCollection.push(fix_duplicate_array_value[i_a]);
            //   } //end if fix3
            //   // ======================== FIX3 NOT FOUND =======================
            // } //end if (GetIndexData > -1)
            // ========================================= SUPER BUG


          } // end for DataFromCollection

        } else {  // BUG FIX 20220520


          // ======================== FIX3 NOT FOUND ========================

          //==================== MANUAL GET INDEX 20220606 ====================
          // if (DONE_VALIDATE_DataFromCollection.findIndex(fix3 =>
          //   fix3 === fix_duplicate_array_value[i_a]
          // ) == -1) {

          let GetIndex_DONE_VALIDATE = -1; // NOT FOUND
          for (let i_x1 = 0; i_x1 < DONE_VALIDATE_DataFromCollection.length; i_x1++) {
            if (
              DONE_VALIDATE_DataFromCollection[i_x1] == fix_duplicate_array_value[i_a]
            ) {
              GetIndex_DONE_VALIDATE = i_x1; // FOUND
            } else {
              continue;
            }
          }
          //==================== MANUAL GET INDEX 20220606 ====================

          if (GetIndex_DONE_VALIDATE == -1) {

            let result_params = {};
            result_params.value = fix_duplicate_array_value[i_a];
            result_params.exist = 0; //'not found';
            if (data_return == 1) {
              result_params.return = null;
            }

            result.push(result_params);
            DONE_VALIDATE_DataFromCollection.push(fix_duplicate_array_value[i_a]);
          } //end if fix3

          // ======================== FIX3 NOT FOUND ========================
        } //end if



      } else {


        if (DataFromCollection.findIndex(check_exist => check_exist[field_name] === fix_duplicate_array_value[i_a]) == -1) { // kalo ga ketemu

          let result_params = {};
          result_params.value = fix_duplicate_array_value[i_a];
          result_params.exist = 0; //'not found';
          if (data_return == 1) {
            result_params.return = null;
          }

          result.push(result_params);


        } else {


          let result_params = {};
          result_params.value = fix_duplicate_array_value[i_a];
          result_params.exist = 1; //'exist';
          if (data_return == 1) {
            result_params.return = DataFromCollection.find(data => data[field_name] == fix_duplicate_array_value[i_a]);
          }
          result.push(result_params);

        }// end if

      }





    } // end for fix_duplicate_array_value




    // ============================= COUNT RESULT =============================


    // for (let i_count = 0; i_count < result.length; i_count++) {
    //   result[i_count].count = result.filter(x => x.value == result[i_count].value).length;

    //   if (use_console_started == 1) {
    //     console.log('start exist/unique remove duplicate result : ' + collection_name + '.' + field_name_value + ' - ' + ResultFixDuplicate[i_count].count + ' result');
    //   }

    // }

    // ============================= COUNT RESULT =============================

    // console.log(result);
    // ============================== FIX DUPLICATE RESULT 20220525 ============================== 



    if (elemMatchValue) { // BUG FIX 20220606
      for (let ixx1 = 0; ixx1 < fix_duplicate_array_value.length; ixx1++) {
        let getIndex = result.findIndex(fix2 => fix2.value === fix_duplicate_array_value[ixx1]);
        if (getIndex == -1) {

          let result_objx = {}

          result_objx.value = fix_duplicate_array_value[ixx1]
          result_objx.exist = 0
          if (data_return == 1) {
            result_objx.return = null
          }
          result.push(result_objx);

        }
      }
    }






    // let ResultFixDuplicate = [];


    // // if (elemMatchValue) {

    // for (let i_fix = 0; i_fix < result.length; i_fix++) {
    //   if (ResultFixDuplicate.findIndex(check_exist => check_exist.value === result[i_fix].value) == -1) {
    //     // ADA BEBERAPA EXIST YANG SEHARUSNYA 1 tapi malah 0 ( untuk length sudah benar )
    //     ResultFixDuplicate.push(result[i_fix]); // data not found push
    //   }

    // }


    // for (let i_count = 0; i_count < ResultFixDuplicate.length; i_count++) {



    //   ResultFixDuplicate[i_count].count = result.filter(x => x.value == ResultFixDuplicate[i_count].value).length;

    //   if (use_console_started == 1) {
    //     console.log('start exist/unique remove duplicate result : ' + collection_name + '.' + field_name_value + ' - ' + ResultFixDuplicate[i_count].count + ' result');
    //   }

    // }


    // result = ResultFixDuplicate;

    // // }

    // ============================== FIX DUPLICATE RESULT 20220525 ============================== 

    res_json.statusCode = 1;
    res_json.data = result;
    return res_json;


  } catch (error) {
    console.log('function request_validation_exist.exist_validation_elemMatch_kv, error : ' + error.message);
    error_detail.try_catch_error_detail(error);

    res_json.statusCode = 0;
    res_json.message = error.message;

    return res_json;
  }


};


exports.exist_validation = async function (collection_name, field_name, custom_filter = {}, array_value = [], data_return = 0) {
  // ========================== NOTE ==========================
  // collection_name = nama collection / nama tabel
  // field_name = nama field / nama key
  // custom_filter = parameter condition untuk filter data
  // array_value =  value array
  // data_return =  1  mengembalikan return ,0 tidak mengembalikan return
  // ========================== /NOTE ==========================

  // ========================== EXAMPLE ==========================
  // const request_validation_exist = require('./tools/request_validation_exist');
  // let account_code_array = ["1601.003", "1602.002", "6101.004", "1101.001", "1101.001", "1101.001", "1101.001", "xxx"];
  // let account_code_condition = {
  //   company_id: "EKITESTING_MIGRATION-174"
  // };
  // let account_code_return = 1
  // let account_code_validator = await request_validation_exist.exist_validation('accounts', 'account_code', account_code_condition, account_code_array, account_code_return);
  // return account_code_validator;
  // ========================== /EXAMPLE ==========================

  // WARNING KALO RUBAH FUNCTION WAJIB BIKIN FUNCTION BARU, KARENA EXISTING SUDAH DI GUNAKAN BANYAK VALIDASI

  let res_json = {};


  try {
    let use_console_loading = 0;
    let use_console_started = 0; //  let use_console_started = 1;

    //  // FIX DUPLICATE ARRAY 2022-02-17
    //  if (arr_create_product_list_x_count.findIndex(check_exist_from_array => check_exist_from_array.sku === result.data.data[i_a].sku) == -1) {
    //   arr_create_product_list_x_count.push(create_product_list);
    // }

    let fix_duplicate_array_value = [];


    if (use_console_started == 1) {
      console.log('start exist/unique remove duplicate : ' + collection_name + '.' + field_name + ' - ' + array_value.length + ' data started! ');
    }

    for (let i_a = 0; i_a < array_value.length; i_a++) {
      if (use_console_loading == 1) {
        console.log('loading exist/unique remove duplicate : ' + collection_name + '.' + field_name + ' PART I ' + (i_a + 1) + '/' + array_value.length);
      }
      if (typeof array_value[i_a] == 'string') { // FIX CASE SENSITIVE
        if (fix_duplicate_array_value.findIndex(check_exist => String(check_exist).toUpperCase() === String(array_value[i_a]).toUpperCase()) == -1) {
          fix_duplicate_array_value.push(array_value[i_a]); // data not found push
        }
      } else {
        if (fix_duplicate_array_value.findIndex(check_exist => check_exist === array_value[i_a]) == -1) {
          fix_duplicate_array_value.push(array_value[i_a]); // data not found push
        }
      }
    }


    let DataFromCollectionParams = {
      [field_name]: {
        $in: fix_duplicate_array_value
      },
      ...custom_filter
    };


    // let DataFromCollectionProjection = { [field_name]: 1 };

    let DataFromCollectionProjection = { _id: 0 };

    let DataFromCollection = await db[collection_name].find(
      DataFromCollectionParams,
      DataFromCollectionProjection
    );

    let result = [];

    if (use_console_started == 1) {
      console.log('start exist/unique check : ' + collection_name + '.' + field_name + ' - ' + fix_duplicate_array_value.length + ' data started! ');
    }


    for (let i_a = 0; i_a < Number(fix_duplicate_array_value.length); i_a++) {
      if (use_console_loading == 1) {
        console.log('loading exist/unique check : ' + collection_name + '.' + field_name + ' - ' + (i_a + 1) + '/' + fix_duplicate_array_value.length);
      }
      if (DataFromCollection.findIndex(check_exist => check_exist[field_name] === fix_duplicate_array_value[i_a]) == -1) { // kalo ga ketemu

        let result_params = {};
        result_params.value = fix_duplicate_array_value[i_a];
        result_params.exist = 0; //'not found';
        if (data_return == 1) {
          result_params.return = null;
        }

        result.push(result_params);


      } else {


        let result_params = {};
        result_params.value = fix_duplicate_array_value[i_a];
        result_params.exist = 1; //'exist';
        if (data_return == 1) {
          result_params.return = DataFromCollection.find(data => data[field_name] == fix_duplicate_array_value[i_a]);
        }
        result.push(result_params);

      }// end if
    } // end for



    // ============================== FIX DUPLICATE RESULT 20220525 ============================== 

    // let ResultFixDuplicate = [];

    // //  if (elemMatchValue) {

    // for (let i_fix = 0; i_fix < result.length; i_fix++) {


    //   // if (ResultFixDuplicate.findIndex(check_exist => ((check_exist && check_exist.value) ? check_exist.value : 0 === result[i_fix].value)) == -1) {
    //   if (ResultFixDuplicate.findIndex(check_exist => check_exist.value === result[i_fix].value) == -1) { // BUG FIX DONE
    //     ResultFixDuplicate.push(result[i_fix]); // data not found push
    //   }

    // }

    // for (let i_count = 0; i_count < ResultFixDuplicate.length; i_count++) {
    //   ResultFixDuplicate[i_count].count = result.filter(x => x.value == ResultFixDuplicate[i_count].value).length;

    //   if (use_console_started == 1) {
    //     console.log('start exist/unique remove duplicate result : ' + collection_name + '.' + field_name_value + ' - ' + ResultFixDuplicate[i_count].count + ' result');
    //   }

    // }


    // result = ResultFixDuplicate;

    //  }

    // ============================== FIX DUPLICATE RESULT 20220525 ============================== 


    res_json.statusCode = 1;
    res_json.data = result;
    return res_json;


  } catch (error) {
    console.log('function request_validation_exist.exist_validation, error : ' + error.message);
    error_detail.try_catch_error_detail(error);

    res_json.statusCode = 0;
    res_json.message = error.message;

    return res_json;
  }


};

