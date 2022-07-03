
const moment = require('moment-timezone');

// let tgl = moment("2021-12-02T17:00:00.000Z")

exports.setHoursMinutesSeconds = async (set_date) => {
  let now_moment = moment(set_date);

  let convert_date_to_datetime = new Date(now_moment);
  let now = new Date(moment());

  // convert_date_to_datetime.setHours(now.getHours());
  // convert_date_to_datetime.setMinutes(now.getMinutes());
  // convert_date_to_datetime.setSeconds(now.getSeconds());

  convert_date_to_datetime.setHours(now.getHours(), now.getMinutes(), now.getSeconds());

  return moment(convert_date_to_datetime);
};;


// console.log(exports.setHoursMinutesSeconds(tgl))