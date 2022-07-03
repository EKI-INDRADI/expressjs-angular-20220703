// Maintainer : Eki

// READ ME  : 
// function ini digunakan untuk rate limit handle

// NOT JANGAN RUBAH FUNCTION INI, BERHUBUNGAN DENGAN FORSTOK MARKETPLACE



// EXAMPLE  :
// let PROFILE = 5000 // "TESTING" "FORSTOK" "EKITESTING"
// let rateLimit = await delay.rateLimitHandle(PROFILE)
// console.log(rateLimit)
// return rateLimit


exports.rateLimitHandle = (t, val) => {
  let res_json = {}

  if (!t) {
    res_json.statusCode = 0
    res_json.message = 't is required'
    return res_json
  }

  let data_profile = []

  // ================ ADD PROFILE ================

  data_profile.push({  //  1 second for 1 request  or  1 minute for 60 request 
    profile: "EKITESTING",
    value: 1000
  })

  data_profile.push({ // 1 minute for 50 request
    profile: "FORSTOK",
    value: 1200
  })


  data_profile.push({ // 5 second for 1 request 
    profile: "TESTING",
    value: 5000
  })

  // ================ /DD PROFILE ================

  let profile = "DEFAULT"
  let profile_check = 0

  for (let i_x = 0; i_x < data_profile.length; i_x++) {
    if (data_profile[i_x].profile == t) {
      profile = data_profile[i_x].profile
      t = data_profile[i_x].value
      profile_check = 1
    }
  }

  if (profile_check == 0 && typeof t != 'number') {
    res_json.statusCode = 0
    res_json.message = 'profile not found'
    return res_json
  }


  let isStarted = `=== rate limit handle profile : ${profile}, is started ! ( await ${t} ms ) ===`
  let isDone = `=== rate limit handle profile : ${profile}, is done ! ( await ${t} ms ) ===`

  val = {}
  val.statusCode = 1
  val.message = isDone

  console.log(isStarted);
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(val);
      console.log(isDone);
    }, t);
  });
};;
