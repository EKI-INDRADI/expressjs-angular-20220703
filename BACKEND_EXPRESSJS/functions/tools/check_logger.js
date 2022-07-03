
// Maintainer : Eki

// READ ME  : 
// untuk check logger (mirip morgan), pada function
// NOT JANGAN RUBAH FUNCTION INI, BERHUBUNGAN DENGAN FORSTOK MARKETPLACE

// example : 
// const check_logger = require('../../functions/tools/check_logger');
// let logStart = check_logger.LoggerStart()
// console.log(`=== FORSTOK -> PRIEDS | INTEGRATION DOCUMENT | INSERT MANY | ${check_logger.LoggerEnd(logStart, 'TIME', 2)}`);

const moment = require('moment-timezone');

exports.LoggerStart = () => {
  return new Date().getTime();
};;



exports.LoggerEnd = (logger_start, logger_name, profile_mode = 1, profile_mode_1_time_set = null) => {
  let logger_end = new Date().getTime();
  let logger_process = logger_start - logger_end;
  logger_process = Number(Math.abs(logger_process));

  let time_value = null;
  let message = null;

  if (profile_mode == 1) {
    if (profile_mode_1_time_set == "startOfDay") {
      time_value = moment().tz('Asia/Jakarta').startOf('day').toISOString();
    } else if (time_set == "endOfDay") {
      time_value = moment().tz('Asia/Jakarta').endOf('day').toISOString();
    } else {
      time_value = moment().tz('Asia/Jakarta').toISOString();
    }
    message = `${logger_name} ${time_value} [GMT+0] execution time: ${logger_process / 1000} seconds`;
  } else if (profile_mode == 2) {
    message = `${logger_name} : ${logger_process / 1000} seconds`;
  } else if (profile_mode == 3) {
    message = `${logger_process / 1000} seconds`;
  } else {
    message = `${logger_process / 1000} seconds`;
  }

  return message;
};


