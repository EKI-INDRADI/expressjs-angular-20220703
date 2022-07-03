

let error_detail = require('./tools/try_catch_error_detail');
let request_validation = require('./tools/request_validation');
let axios = require('axios').default;
let moment = require('moment-timezone');
let delay = require('./tools/delay');
let axios_generate = require('./tools/axios_generate');
let cfg = require('../middlewares/config/api_3rd.config');
let auto_data_object_sort_alphabetical = require('./tools/auto_data_object_sort_alphabetical');
let request_validation_exist = require('./tools/request_validation_exist');


const db = require("../models");
//================= BEARER

exports.BearerGetListbookPages = async (req_body_origin) => {

    let res_json = {};
    let NewReqBody = []
    NewReqBody.push(req_body_origin)
    let req_body = NewReqBody[0]

    try {
        let parameter = {}
        let schema = {}
        parameter.book = req_body.book
        schema.book = 'string'

        // parameter.skip = req_body.skip
        // schema.skip = 'number'

        // parameter.limit = req_body.limit
        // schema.limit = 'number'

        let check_data = {};


        check_data = await request_validation.check_all_with_schema_v2(parameter, schema);

        if (check_data.statusCode == 1) {

            res_json.statusCode = 1;
            res_json.message = 'data valid';
            res_json.validation_level_1 = {
                statusCode: 1
            };

            return res_json

        } else {

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

            res_json.statusCode = 0;
            res_json.message = 'error error check data types/schema from object/array';
            res_json.validation_level_1 = check_data;

            return res_json;
        } // check_data



    } catch (error) {
        console.log('function test.BearerGetBookList, error : ' + error.message);
        error_detail.try_catch_error_detail(error);
        res_json.statusCode = 0;
        res_json.message = error.message;
        return res_json;
    }


}

//================= /BEARER



exports.GetListbookPages = async (req_body_origin) => {


    let res_json = {};
    let NewReqBody = []
    NewReqBody.push(req_body_origin)
    let req_body = NewReqBody[0]


    //=======================FORCE
    if (!req_body.limit) {
        req_body.limit = 6
    }

    if (!req_body.skip) {
        req_body.skip = 0
    }
    //=======================FORCE

    try {


        let extrimebearer = await exports.BearerGetListbookPages(req_body)
        if (extrimebearer.statusCode == 0) {
            return extrimebearer
        }


        let skip = null
        let limit = null
        let page = null
        let pages = null
        let count = null

        skip = req_body.skip
        limit = req_body.limit


        if (skip || limit) {

            if (skip && limit) {

            } else if (skip) {
                limit = 10
            } else if (limit) {
                skip = 0
            }

            page = Math.ceil(Number(skip) / Number(limit)) + 1

        }



        //========================= RATE LIMIT HANDLE =========================
        // https://developers.google.com/apis-explorer
        // https://developers.google.com/books/docs/v1/reference/
        // `${cfg.API_3RD_HOST}/books/v1/volumes?q=${req_body.book}&limit=${req_body.limit}&offset=${req_body.skip}`


        let result = null
        // https://www.googleapis.com/books/v1/volumes?q=search+terms&maxResults=20&startIndex=20 //https://stackoverflow.com/questions/68779646/how-to-get-the-next-page-in-the-google-books-api-for-python
        let StartIndex = 1


        //============ dari 0 bukan 1

        // if (req_body.skip) {
        //     StartIndex = req_body.skip + 1
        // } else {
        //     StartIndex = 1
        // }
        //============ /dari 0 bukan 1

        StartIndex = req_body.skip

        let url_parameter = `${cfg.API_3RD_HOST}/books/v1/volumes?q=${req_body.book}&maxResults=${req_body.limit}&startIndex=${StartIndex}`
        let AxiosParams = {
            method: 'get',
            url: url_parameter,
            // headers: {
            //     "Authorization": `Bearer ${req_body.HEADER_API_3RD_TOKEN}`
            // },
            // data: parameter
        }

        result = await axios_generate.AxiosSetup(AxiosParams, "EKITESTING")

        //========================= /RATE LIMIT HANDLE =========================

        // count = (result.data && result.data.items) ? result.data.items.length : 0
        count = (result.data && result.data.totalItems) ? result.data.totalItems : 0
        pages = (Math.ceil(count / limit)) || 0

        if (result && result.status == 200) {
            res_json.statusCode = 1
            res_json.message = "Successful"
            res_json.count = count

            if (skip || limit) {
                res_json.page = page
                res_json.pages = pages
                res_json.limit = limit
            }

            res_json.data = (result.data && result.data.items) ? result.data.items : null

        } else {
            res_json.statusCode = 0
            res_json.message = "error status : " + result.status
            res_json.count = count
            if (skip || limit) {
                res_json.page = page
                res_json.pages = pages
                res_json.limit = limit
            }
            res_json.data = (result.data) ? result.data : null

        }



        //================= REPAIR DATA =================
        for (let i_a = 0; i_a < res_json.data.length; i_a++) {

            //--------------------------FIX AUTHOR 
            let authorString = ""
            if (res_json.data[i_a] &&
                res_json.data[i_a].volumeInfo &&
                res_json.data[i_a].volumeInfo.authors &&
                res_json.data[i_a].volumeInfo.authors.length > 0) {

                for (let i_b = 0; i_b < res_json.data[i_a].volumeInfo.authors.length; i_b++) {

                    // if (res_json.data[i_a].volumeInfo.authors[i_b] == "Tanika Gupta") {
                    //     res_json.data[i_a].volumeInfo.authors.push("EKITESTING")
                    // }

                    authorString += res_json.data[i_a].volumeInfo.authors[i_b]
                    if (i_b < res_json.data[i_a].volumeInfo.authors.length - 1) {
                        authorString += ", "
                    }
                }




            } else {
                authorString = ""
            }

            res_json.data[i_a].volumeInfo.authorString = authorString
            //--------------------------FIX AUTHOR 


            //--------------------------FIX IMAGE 
            if (res_json.data[i_a] &&
                res_json.data[i_a].volumeInfo &&
                res_json.data[i_a].volumeInfo.imageLinks &&
                res_json.data[i_a].volumeInfo.imageLinks.smallThumbnail) {

            } else {
                if (!res_json.data[i_a].volumeInfo) {
                    res_json.data[i_a].volumeInfo = {}
                    res_json.data[i_a].volumeInfo.imageLinks = {}
                }

                if (res_json.data[i_a].volumeInfo && !res_json.data[i_a].volumeInfo.imageLinks) {
                    res_json.data[i_a].volumeInfo.imageLinks = {}
                }
                res_json.data[i_a].volumeInfo.imageLinks.smallThumbnail = "https://uxwing.com/wp-content/themes/uxwing/download/07-web-app-development/image-not-found.png"
            }

            if (res_json.data[i_a] &&
                res_json.data[i_a].volumeInfo &&
                res_json.data[i_a].volumeInfo.imageLinks &&
                res_json.data[i_a].volumeInfo.imageLinks.thumbnail) {

            } else {

                if (!res_json.data[i_a].volumeInfo) {
                    res_json.data[i_a].volumeInfo = {}
                    res_json.data[i_a].volumeInfo.imageLinks = {}
                }

                if (res_json.data[i_a].volumeInfo && !res_json.data[i_a].volumeInfo.imageLinks) {
                    res_json.data[i_a].volumeInfo.imageLinks = {}
                }


                res_json.data[i_a].volumeInfo.imageLinks.thumbnail = "https://uxwing.com/wp-content/themes/uxwing/download/07-web-app-development/image-not-found.png"


            }

            //--------------------------FIX IMAGE 



            //--------------------------SHOW RATING //SLOW SPEED request per object
            // let CheckRatingParams = {}
            // CheckRatingParams.title = res_json.data[i_a].volumeInfo.title

            // let CheckRating = await db.rating.findOne(CheckRatingParams)

            // res_json.data[i_a].rating = (CheckRating && CheckRating.rating) ? CheckRating.rating : 0
            //--------------------------SHOW RATING








        }


        //--------------------------SHOW RATING //HIGH SPEED 1x request per array to db
        let rating_title_arr = []
        for (let i_c = 0; i_c < res_json.data.length; i_c++) {
            rating_title_arr.push(res_json.data[i_c].volumeInfo.title)
        }

        let rating_condition = {
            // "company": "EKITESTING_MIGRATION-174"
        };


        let rating_return = 1
        let rating_validator = await request_validation_exist.exist_validation(
            'rating', // collection
            'title', // field
            rating_condition,
            rating_title_arr,
            rating_return);

        if (rating_validator.statusCode == 1) {
            for (let i_x = 0; i_x < rating_validator.data.length; i_x++) {
                if (rating_validator.data[i_x].exist == 1) {

                    //---------------------- CHECK
                    let GetIndexData = -1; // NOT FOUND
                    for (let i_axx = 0; i_axx < res_json.data.length; i_axx++) {


                        if (
                            res_json.data[i_axx].volumeInfo.title == rating_validator.data[i_x].return.title
                        ) {
                            console.log(res_json.data[i_axx].volumeInfo.title + " | " + rating_validator.data[i_x].return.title)
                            GetIndexData = i_axx; // FOUND
                        } else {
                            continue;
                        }
                    }
                    //---------------------- /CHECK


                    if (GetIndexData >= 0) {
                        let db_rating = (rating_validator.data[i_x] && rating_validator.data[i_x].return && rating_validator.data[i_x].return.rating) ? rating_validator.data[i_x].return.rating : 0
                        res_json.data[GetIndexData].rating = db_rating
                    }



                }
            }


            for (let i_axx = 0; i_axx < res_json.data.length; i_axx++) {
                if (res_json.data[i_axx] && res_json.data[i_axx].rating >= 0) {
                    // dont repair
                } else {
                    //repair
                    res_json.data[i_axx].rating = 0
                }
            }

        }

        //--------------------------/SHOW RATING //HIGH SPEED 1x request per array to db


        //--------------------------SHOW WISHLIST //HIGH SPEED 1x request per array to db
        let wishlist_user_login_arr = []
        let wishlist_title_arr = []

        for (let i_c = 0; i_c < res_json.data.length; i_c++) {
            wishlist_title_arr.push(res_json.data[i_c].volumeInfo.title)
        }

        let wishlist_condition = {
           user_login: req_body.user_login
        };


        let wishlist_return = 1
        let wishlist_validator = await request_validation_exist.exist_validation(
            'wishlist', // collection
            'title', // field
            wishlist_condition,
            wishlist_title_arr,
            wishlist_return);

          


        if (wishlist_validator.statusCode == 1) {
            for (let i_x = 0; i_x < wishlist_validator.data.length; i_x++) {
                if (wishlist_validator.data[i_x].exist == 1) {

                    //---------------------- CHECK
                    let GetIndexData = -1; // NOT FOUND
                    for (let i_axx = 0; i_axx < res_json.data.length; i_axx++) {


                        if (
                            res_json.data[i_axx].volumeInfo.title == wishlist_validator.data[i_x].return.title
                        ) {
                            GetIndexData = i_axx; // FOUND
                        } else {
                            continue;
                        }
                    }
                    //---------------------- /CHECK


                    if (GetIndexData >= 0) {
                        res_json.data[GetIndexData].wishlist = 1
                    }



                }
            }


            for (let i_axx = 0; i_axx < res_json.data.length; i_axx++) {
                if (res_json.data[i_axx] && res_json.data[i_axx].wishlist >= 0) {
                    // dont repair
                } else {
                    //repair
                    res_json.data[i_axx].wishlist = 0
                }
            }

        }


        //--------------------------SHOW WISHLIST //HIGH SPEED 1x request per array to db















        //================= REPAIR DATA =================



        //=============== SORT OBJECT VALUE UNTUK MEMUDAHKAN PENCARIAN OBJECT DENGAN MATA =================
        let copy_origin_data = []
        copy_origin_data.push({ data: result.data })
        if (res_json.data != null) {
            for (let i_a = 0; i_a < res_json.data.length; i_a++) {
                res_json.data[i_a] = auto_data_object_sort_alphabetical.objectSortByAlphabetical(res_json.data[i_a]).after_sort
                if (res_json.data[i_a].accessInfo) {
                    res_json.data[i_a].accessInfo = auto_data_object_sort_alphabetical.objectSortByAlphabetical(res_json.data[i_a].accessInfo).after_sort
                }
                if (res_json.data[i_a].saleInfo) {
                    res_json.data[i_a].saleInfo = auto_data_object_sort_alphabetical.objectSortByAlphabetical(res_json.data[i_a].saleInfo).after_sort
                }
                if (res_json.data[i_a].searchInfo) {
                    res_json.data[i_a].searchInfo = auto_data_object_sort_alphabetical.objectSortByAlphabetical(res_json.data[i_a].searchInfo).after_sort
                }
                if (res_json.data[i_a].volumeInfo) {
                    res_json.data[i_a].volumeInfo = auto_data_object_sort_alphabetical.objectSortByAlphabetical(res_json.data[i_a].volumeInfo).after_sort
                }
            }
        }

        res_json = auto_data_object_sort_alphabetical.objectSortByAlphabetical(res_json).after_sort
        //=============== /SORT OBJECT VALUE UNTUK MEMUDAHKAN PENCARIAN OBJECT DENGAN MATA =================


        return res_json

    } catch (error) {
        console.log('function test.GetListbookPages, error : ' + error.message);
        error_detail.try_catch_error_detail(error);
        res_json.statusCode = 0;
        res_json.message = error.message;
        return res_json;
    }


}


exports.CreateWishlist = async (req_body_origin) => {

    let res_json = {};
    let req_body = req_body_origin;

    try {
        let CreateWishlistParams = {};
        CreateWishlistParams.user_login = req_body.user_login;
        CreateWishlistParams.title = req_body.title;
        CreateWishlistParams.subtitle = req_body.subtitle;
        CreateWishlistParams.authorString = req_body.authorString;
        CreateWishlistParams.author = req_body.author;
        CreateWishlistParams.smallThumbnail = req_body.smallThumbnail;
        CreateWishlistParams.thumbnail = req_body.thumbnail;
        CreateWishlistParams.publishedDate = req_body.publishedDate;
        CreateWishlistParams.infoLink = req_body.infoLink;
        CreateWishlistParams.printType = req_body.printType;



        let CheckWishlistExistParams = {}
        CheckWishlistExistParams.user_login = req_body.user_login;
        CheckWishlistExistParams.title = req_body.title


        let CheckWishlistExist = await db.wishlist.findOne(CheckWishlistExistParams)


        if (CheckWishlistExist) {

            res_json.statusCode = 0;
            res_json.message = 'already exist';
            return res_json;

        } else {
            let CreateWishlist = await db.wishlist.create(CreateWishlistParams);
        }


        res_json.statusCode = 1;
        res_json.message = 'success wishlist success';
        return res_json;




    } catch (error) {
        console.log('function test.CreateWishlist, error : ' + error.message);
        error_detail.try_catch_error_detail(error);
        res_json.statusCode = 0;
        res_json.message = error.message;
        return res_json;
    }


};


exports.DeleteWishlist = async (req_body_origin) => {

    let res_json = {};
    let req_body = req_body_origin;

    try {


        let DeleteWishlistParams = {};
        DeleteWishlistParams.user_login = req_body.user_login;
        DeleteWishlistParams.title = req_body.title;


        let deleteWishlist = await db.wishlist.deleteOne(DeleteWishlistParams);

        res_json.statusCode = 1;
        res_json.message = 'success delete wishlist success';
        return res_json;

    } catch (error) {
        console.log('function test.DeleteWishlist, error : ' + error.message);
        error_detail.try_catch_error_detail(error);
        res_json.statusCode = 0;
        res_json.message = error.message;
        return res_json;
    }


};


exports.GetWishlist = async (req_body_origin) => {

    let req_body = req_body_origin
    let res_json = {};

    try {


        // if (req_body.condition.created_time) {
        //     if (typeof req_body.condition.created_time === 'object') {
        //         req_body.condition.created_time = {
        //             $gte: new Date(req_body.condition.created_time.$gte),
        //             $lte: new Date(req_body.condition.created_time.$lte),
        //         };
        //     } else {
        //         req_body.condition.created_time = new Date(req_body.condition.created_time);
        //     }
        // }

        let conditionParams = {
            user_login: req_body.user_login,
        }
        const aggregate_condition = [
            {
                $match: conditionParams
            }
        ];

        aggregate_condition.push({
            $project: {
                _id: 0,
                __v: 0
            }
        });


        if (req_body.sort) {
            aggregate_condition.push({
                $sort: req_body.sort
            });
        } else {
            aggregate_condition.push({
                $sort: {
                    created_time: -1
                }
            });
        }

        if (req_body.skip) {
            aggregate_condition.push({ $skip: req_body.skip });
        }

        if (req_body.limit) {
            aggregate_condition.push({ $limit: req_body.limit });
        }


        let response = await db.wishlist.aggregate(aggregate_condition).exec();

        res_json.statusCode = 1;
        if (req_body.skip || req_body.limit) {
            let response_count = await db.wishlist.countDocuments(conditionParams)
            res_json.count = response_count;
        } else {
            res_json.count = response.length;
        }

        res_json.data = response;

        return res_json;


    } catch (error) {
        console.log('function test.GetWishlist, error : ' + error.message);
        error_detail.try_catch_error_detail(error);

        res_json.statusCode = 0;
        res_json.message = error.message;

        return res_json;
    }


};


exports.CreateUpdateRating = async (req_body_origin) => {

    let res_json = {};
    let req_body = req_body_origin;

    try {


        let WISHLIST = {};
        WISHLIST.rating = req_body.rating;
        WISHLIST.rating_count = 1
        WISHLIST.title = req_body.title;
        WISHLIST.subtitle = req_body.subtitle;
        WISHLIST.authorString = req_body.authorString;
        WISHLIST.author = req_body.author;
        WISHLIST.smallThumbnail = req_body.smallThumbnail;
        WISHLIST.thumbnail = req_body.thumbnail;
        WISHLIST.publishedDate = req_body.publishedDate;
        WISHLIST.infoLink = req_body.infoLink;
        WISHLIST.printType = req_body.printType;

        let FindOneWishlist = await db.rating.findOne({
            title: WISHLIST.title
        });

        if (FindOneWishlist) {
            let before_total_rating_value = FindOneWishlist.rating * FindOneWishlist.rating_count
            let after_rating_count = FindOneWishlist.rating_count + 1
            let after_total_rating_value = before_total_rating_value + WISHLIST.rating
            let after_rating = after_total_rating_value / after_rating_count

            WISHLIST.rating = after_rating
            WISHLIST.rating_count = after_rating_count
            let UpdateOneWishlist = await db.rating.updateOne(WISHLIST);
        } else {
            let CreateWishlist = await db.rating.create(WISHLIST);
        }


        res_json.statusCode = 1;
        res_json.message = 'success wishlist success';
        res_json.rating = WISHLIST.rating;
        return res_json;

    } catch (error) {
        console.log('function test.UpdateRating, error : ' + error.message);
        error_detail.try_catch_error_detail(error);
        res_json.statusCode = 0;
        res_json.message = error.message;
        return res_json;
    }


};

