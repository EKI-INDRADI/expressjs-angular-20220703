
let error_detail = require('./try_catch_error_detail');
let request_validation = require('./request_validation');
// let cfg = require("../../middlewares/config/forstok.config");
let axios = require('axios').default;
let delay = require('./delay');
const check_logger = require('./check_logger');

// note : 
// need update rate limit 
// - forstok inventory.updateOneInventoryPriceStore NOT USED
// - forstok webhook.registerUrlCallback (FUNC NOT USE axios_generate, MANUAL HANDLE ERROR STATUS CODE)

exports.AxiosSetup = async (AxiosParams, RateLimitProfileOrValue) => {

    //========================= RATE LIMIT HANDLE 20220517 ==========================
    let result = null

    if (!RateLimitProfileOrValue) {
        RateLimitProfileOrValue = 100 // 0.1 sec
    }

    // let AxiosParams = {
    //     method: 'get',
    //     url: url_parameter,
    //     headers: {
    //         "Authorization": `Bearer ${req_body.HEADER_FORSTOK_TOKEN}`
    //     },
    // }


    try {

        let logStart = check_logger.LoggerStart()

        let try_name = "1"
        result = await axios(AxiosParams).catch(function (error) {

            let status = null
            if (error && 
                error.status) {

                status = error.status
            }

            if (status == null && 
                error && 
                error.response && 
                error.response.status) {

                status = error.response.status
            }


            if (status >= 500) {
                let message = ` AXIOS GENERATE ERROR STATUS #${try_name} :  ${status} (RE-TRY ${try_name}) | ${check_logger.LoggerEnd(logStart, 'TIME', 2)}`
                console.log(message)
                throw new Error(message)
            }
        })

    } catch (ERROR_RE_TRY1) {
        // await delay.rateLimitHandle(RateLimitProfileOrValue)
        // result = await axios(AxiosParams)
        let logStart = check_logger.LoggerStart()
        await delay.rateLimitHandle(RateLimitProfileOrValue)

        try {
            let try_name = "2"
            result = await axios(AxiosParams).catch(function (error) {
    
                let status = null
                if (error && 
                    error.status) {
    
                    status = error.status
                }
    
                if (status == null && 
                    error && 
                    error.response && 
                    error.response.status) {
    
                    status = error.response.status
                }
    
    
                if (status >= 500) {
                    let message = ` AXIOS GENERATE ERROR STATUS #${try_name} :  ${status} (RE-TRY ${try_name}) | ${check_logger.LoggerEnd(logStart, 'TIME', 2)}`
                    console.log(message)
                    throw new Error(message)
                }
            })
        } catch (ERROR_RE_TRY2) {
            let logStart = check_logger.LoggerStart()
            await delay.rateLimitHandle(RateLimitProfileOrValue)

            try {
                let try_name = "3"
                result = await axios(AxiosParams).catch(function (error) {
        
                    let status = null
                    if (error && 
                        error.status) {
        
                        status = error.status
                    }
        
                    if (status == null && 
                        error && 
                        error.response && 
                        error.response.status) {
        
                        status = error.response.status
                    }
        
        
                    if (status >= 500) {
                        let message = ` AXIOS GENERATE ERROR STATUS #${try_name} :  ${status} (RE-TRY ${try_name}) | ${check_logger.LoggerEnd(logStart, 'TIME', 2)}`
                        console.log(message)
                        throw new Error(message)
                    }
                })
            } catch (ERROR_RE_TRY3) {
                let logStart = check_logger.LoggerStart()
                await delay.rateLimitHandle(RateLimitProfileOrValue)

                try {
                    let try_name = "4"
                    result = await axios(AxiosParams).catch(function (error) {
            
                        let status = null
                        if (error && 
                            error.status) {
            
                            status = error.status
                        }
            
                        if (status == null && 
                            error && 
                            error.response && 
                            error.response.status) {
            
                            status = error.response.status
                        }
            
            
                        if (status >= 500) {
                            let message = ` AXIOS GENERATE ERROR STATUS #${try_name} :  ${status} (RE-TRY ${try_name}) | ${check_logger.LoggerEnd(logStart, 'TIME', 2)}`
                            console.log(message)
                            throw new Error(message)
                        }
                    })
                } catch (ERROR_RE_TRY4) {
                    let logStart = check_logger.LoggerStart()
                    await delay.rateLimitHandle(RateLimitProfileOrValue)
                    let try_name = "5"
                    result = await axios(AxiosParams).catch(function (error) {
            
                        let status = null
                        if (error && 
                            error.status) {
            
                            status = error.status
                        }
            
                        if (status == null && 
                            error && 
                            error.response && 
                            error.response.status) {
            
                            status = error.response.status
                        }
            
            
                        if (status >= 500) {
                            let message = ` AXIOS GENERATE ERROR STATUS #${try_name} :  ${status} (RE-TRY ${try_name}) | ${check_logger.LoggerEnd(logStart, 'TIME', 2)}`
                            console.log(message)
                            //throw new Error(message)
                        }
                    })

                } //end try 4

            } //end try 3

        } //end try 2

    } //end try 1


    if (result == undefined || result == null) {

        let logStart = check_logger.LoggerStart()
        await delay.rateLimitHandle(RateLimitProfileOrValue)
        result = await axios(AxiosParams)
        let try_name = "6"
        let message = ` AXIOS GENERATE ERROR STATUS #${try_name} :  ${error.response.status} (LAST RE-TRY ${try_name}) | ${check_logger.LoggerEnd(logStart, 'TIME', 2)}`
        console.log(message)

        // let logStart = check_logger.LoggerStart()
        // await delay.rateLimitHandle(RateLimitProfileOrValue)
        // result = await axios(AxiosParams).catch(async error => {

        //     let try_name = "6"
        //     let message = ` AXIOS GENERATE ERROR STATUS #${try_name} :  ${error.response.status} (RE-TRY ${try_name}) | ${check_logger.LoggerEnd(logStart, 'TIME', 2)}`
        //     //==================== FIX ERROR HANDLE  FIX ERR 500
        //     if (error.response.status >= 500) {
        //         let logStart = check_logger.LoggerStart()
        //         await delay.rateLimitHandle(RateLimitProfileOrValue)
        //         result = await axios(AxiosParams)
        //         let try_name = "7"
        //         let message = ` AXIOS GENERATE ERROR STATUS #${try_name} :  ${error.response.status} (RE-TRY ${try_name}) | ${check_logger.LoggerEnd(logStart, 'TIME', 2)}`
        //         console.log(message)
        //     }
        //     //==================== /FIX ERROR HANDLE  FIX ERR 500
        // })

        // if (result == undefined || result == null) {

        // }

    } else if (result && result.status) {

    } else {

        if (result &&
            result.response &&
            result.response.status
        ) {
            result.status = result.response.status
        } else {
            console.log("== AXIOS GENERATE ERROR STATUS ==")
            console.log(result)
            if (result == undefined) {
                result = {}
            }
            result.status = 500
        }

        if (result &&
            result.response &&
            result.response.data
        ) {
            result.data = result.response.data
        } else {
            result.data = null
        }

    }

    console.log("statusCode : " + result.status + ", " + AxiosParams.url)

    return result

    //========================= /RATE LIMIT HANDLE 20220517 ==========================
}